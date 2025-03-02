const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const DriveRouter = express.Router();

const KEY_FILE_PATH = path.resolve(__dirname, "../adamitras_keys.json"); 
const ROOT_FOLDER_ID = "1G-aDZOii2xVjT51t7SSa9UJFLycX_J4X"; 

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

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
 * Upload an image to Google Drive inside "blog_post_images" folder
 */
DriveRouter.post("/upload", upload.single("image"), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      const { originalname, mimetype, path: tempFilePath } = req.file;

      // Check if "blog_post_images" folder exists in root
      const folderResponse = await drive.files.list({
          q: `name = 'blog_post_images' and mimeType = 'application/vnd.google-apps.folder' and '${ROOT_FOLDER_ID}' in parents`,
          fields: "files(id)",
      });

      let folderId;
      if (folderResponse.data.files.length > 0) {
          folderId = folderResponse.data.files[0].id;
      } else {
          // Create folder if it doesn't exist
          const folderMetadata = {
              name: "blog_post_images",
              mimeType: "application/vnd.google-apps.folder",
              parents: [ROOT_FOLDER_ID],
          };
          const folder = await drive.files.create({
              resource: folderMetadata,
              fields: "id",
          });
          folderId = folder.data.id;
      }

      // Upload image to Google Drive
      const fileMetadata = {
          name: originalname,
          parents: [folderId],
      };

      const media = {
          mimeType: mimetype,
          body: fs.createReadStream(tempFilePath),
      };

      const file = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webViewLink",
      });

      // Make the file public
      await drive.permissions.create({
          fileId: file.data.id,
          requestBody: {
              role: "reader",
              type: "anyone",
          },
      });

      // Delete temp file
      fs.unlinkSync(tempFilePath);

      res.json({
          success: true,
          message: "File uploaded successfully",
          imageUrl: `https://drive.google.com/uc?id=${file.data.id}`,
          viewLink: file.data.webViewLink,
      });
  } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});





DriveRouter.get("/subjects/:course/:semester", async (req, res) => {
  const { course, semester } = req.params;


  try {
    // Get the folder ID for the specified course
    const courseResponse = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents and name = '${course}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    if (courseResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseFolderId = courseResponse.data.files[0].id;

    // Get the folder ID for the specified semester within the course
    const semesterResponse = await drive.files.list({
      q: `'${courseFolderId}' in parents and name = '${semester}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    if (semesterResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Semester not found" });
    }

    const semesterFolderId = semesterResponse.data.files[0].id;

    // Fetch subjects (folders) in the semester folder
    const subjectsResponse = await drive.files.list({
      q: `'${semesterFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    const subjects = subjectsResponse.data.files.map((file) => ({
      id: file.id,
      name: file.name,
    }));

    if (subjects.length === 0) {
      return res.status(404).json({ error: "No subjects found in this semester" });
    }

    // Send the list of subjects
    res.json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});



DriveRouter.get("/files/:course/:semester/:subject", async (req, res) => {
  const { course, semester, subject } = req.params;
  try {
    // Fetch course folder ID from root
    const courseFolderResponse = await drive.files.list({
      q: `name = '${course}' and mimeType = 'application/vnd.google-apps.folder' and '${ROOT_FOLDER_ID}' in parents`,
      fields: "files(id, name)",
    });

    if (courseFolderResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Course folder not found" });
    }

    const courseFolderId = courseFolderResponse.data.files[0].id;

    // Fetch semester folder ID within course folder
    const semesterFolderResponse = await drive.files.list({
      q: `name = '${semester}' and mimeType = 'application/vnd.google-apps.folder' and '${courseFolderId}' in parents`,
      fields: "files(id, name)",
    });

    if (semesterFolderResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Semester folder not found" });
    }

    const semesterFolderId = semesterFolderResponse.data.files[0].id;

    // Fetch subject folder ID within semester folder
    const subjectFolderResponse = await drive.files.list({
      q: `name = '${subject}' and mimeType = 'application/vnd.google-apps.folder' and '${semesterFolderId}' in parents`,
      fields: "files(id, name)",
    });

    if (subjectFolderResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Subject folder not found" });
    }

    const subjectFolderId = subjectFolderResponse.data.files[0].id;

    // Fetch all files inside the subject folder
    const filesResponse = await drive.files.list({
      q: `'${subjectFolderId}' in parents`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });

    const files = filesResponse.data.files.map((file) => ({
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
 * Get all PDFs from the Roadmaps folder
 */
DriveRouter.get("/roadmaps", async (req, res) => {
  try {
    // Find the Roadmaps folder in root
    const folderResponse = await drive.files.list({
      q: `name = 'Roadmaps' and mimeType = 'application/vnd.google-apps.folder' and '${ROOT_FOLDER_ID}' in parents`,
      fields: "files(id, name)",
    });

    if (folderResponse.data.files.length === 0) {
      return res.status(404).json({ error: "Roadmaps folder not found" });
    }

    const roadmapFolderId = folderResponse.data.files[0].id;

    // Get all PDF files in the Roadmaps folder
    const filesResponse = await drive.files.list({
      q: `'${roadmapFolderId}' in parents and mimeType = 'application/pdf'`,
      fields: "files(id, name, webViewLink, webContentLink)",
    });

    if (filesResponse.data.files.length === 0) {
      return res.status(404).json({ error: "No PDFs found in Roadmaps folder" });
    }

    const roadmaps = filesResponse.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      viewLink: file.webViewLink,
      downloadLink: file.webContentLink,
    }));

    res.json({ roadmaps });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({ error: "Failed to fetch roadmaps" });
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
