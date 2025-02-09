const express = require('express');
const upload = require('../config/multerConfig');
const Logger = require('../utils/Logger');
const APIRouter = express.Router();
const cloudinary = require('../config/cloudinaryConfig');
const authenticateToken = require('../middleware/auth');

var logger = new Logger();

APIRouter.post("/upload", authenticateToken, upload.array("files", 10), async (req, res) => {
    try {

        if (!req.user)
            return res.json({
                success: false,
                message: "User not allowed"
            })

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Files are required" });
        }

        const uploadedFiles = [];

        // Function to upload a single file
        const uploadToCloudinary = (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "raw", folder: "event_posters" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                stream.end(file.buffer);
            });
        };

        // Upload each file and collect URLs
        for (const file of req.files) {
            const url = await uploadToCloudinary(file);
            uploadedFiles.push(url);
        }

        res.json({
            success: true,
            message: "Files uploaded successfully",
            urls: uploadedFiles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed", error: error.message });
    }
});

module.exports = APIRouter;