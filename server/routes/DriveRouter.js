const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
const path = require('path');
const authenticateToken = require("../middleware/auth");

const DriveRouter = express.Router();

const KEY_FILE_PATH = path.resolve(__dirname, "../google-drive-dev-keys.json"); // Resolves to absolute path
const FOLDER_ID = "1G-aDZOii2xVjT51t7SSa9UJFLycX_J4X"; // Replace with your actual folder ID
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
      q: `'${FOLDER_ID}' in parents`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });
    //console.log(response)

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      viewLink: file.webViewLink,
      downloadLink: file.webContentLink,
    }));

    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

module.exports = DriveRouter;
