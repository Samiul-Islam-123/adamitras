const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
const path = require('path');
const authenticateToken = require("../middleware/auth");

const DriveRouter = express.Router();

const KEY_FILE_PATH = path.resolve(__dirname, "../google-drive-dev-keys.json"); // Resolves to absolute path
const ROOT_FOLDER_ID = "1G-aDZOii2xVjT51t7SSa9UJFLycX_J4X"; // Root folder ID containing all semester folders
// Authenticate Google Drive API
const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

/**
 * Fetch files from Google Drive
 */
DriveRouter.get("/files", async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      viewLink: file.webViewLink,
      downloadLink: file.webContentLink,
    }));

    res.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

/**
 * Search PYQs from a specific semester and subject
 */
DriveRouter.get('/search/:semester/:subject', async (req, res) => {
  try {
    const { semester, subject } = req.params;

    if (!semester || !subject) {
      return res.status(400).json({ error: "Semester and Subject are required" });
    }

    // Step 1: Find the Semester Folder (e.g., Sem_1, Sem_2, etc.)
    const semesterResponse = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${semester}'`,
      fields: "files(id, name)",
    });

    if (!semesterResponse.data.files.length) {
      return res.status(404).json({ error: "Semester not found" });
    }
    
    const semesterFolderId = semesterResponse.data.files[0].id;

    // Step 2: Find the Subject Folder inside the Semester Folder (e.g., DBMS, AI_ML, etc.)
    const subjectResponse = await drive.files.list({
      q: `'${semesterFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${subject}'`,
      fields: "files(id, name)",
    });

    if (!subjectResponse.data.files.length) {
      return res.status(404).json({ error: "Subject folder not found in the given semester" });
    }

    const subjectFolderId = subjectResponse.data.files[0].id;

    // Step 3: Fetch all PDFs inside the Subject Folder
    const response = await drive.files.list({
      q: `'${subjectFolderId}' in parents and mimeType = 'application/pdf'`,
      fields: "files(id, name, webViewLink, webContentLink)",
    });

    if (!response.data.files.length) {
      return res.status(404).json({ error: "No PYQs found for this subject" });
    }

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      viewLink: file.webViewLink,
      downloadLink: file.webContentLink,
    }));

    res.json({ files });
  } catch (error) {
    console.error("Error searching PYQs:", error);
    res.status(500).json({ error: "Failed to search PYQs" });
  }
});

module.exports = DriveRouter;
