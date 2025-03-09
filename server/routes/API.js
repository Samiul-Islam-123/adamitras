const express = require('express');
const upload = require('../config/multerConfig');
const Logger = require('../utils/Logger');
const APIRouter = express.Router();
const cloudinary = require('../config/cloudinaryConfig');
const authenticateToken = require('../middleware/auth');
const PYQModel = require('../models/PYQModel');
const FeedbackModel = require('../models/FeedbackModel');

var logger = new Logger();

APIRouter.post("/upload", upload.array("files", 10), async (req, res) => {//middleware not used. only for testing :)
    const role = req.body.role;
    try {

        if (role==="student")
            return res.json({
                success: false,
                message: "Student are not allowed to upload PYQs"
            })

        if (!req.files || req.files.length === 0) {
            return res.json({ success: false, message: "Files are required" });
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
        res.json({ success: false, message: "Upload failed", error: error.message });
    }
});

APIRouter.post('/upload-url', async(req,res) =>{

    const {url} = req.body;

    try{

        if(!url)
            return res.json({
                success : false,
                message : "Please provide URL"
            })
        const PYQ = new PYQModel({
            url : url
        })

        await PYQ.save();
        res.json({
            success : true,
            message : "Done :)"
        })
    }
    catch(error){
        logger.error(error);
        res.json({
            message : error.message,
            success : false
        })
    }
})

APIRouter.get('/pyq', async(req, res) => {
    try {
        const PYQs =await PYQModel.find();
        res.json({PYQs});
    }
    catch(error){
        logger.error(error);
        return res.json({
            message : error.message,
            success : false
        })
    }
})

APIRouter.post('/feedback', async(req,res) => {
    const {username, email, message} = req.body;
    try{
        const feedback = new FeedbackModel({
            username : username,
            email : email,
            message : message
        })
        await feedback.save();
        res.json({
            success : true,
            message : "Thank you for your feedback"
        })
    }
    catch(error){
        logger.error(error);
        return res.json({
            message : error.message,
            success : false
        })
    }
})

module.exports = APIRouter;