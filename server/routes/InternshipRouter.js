const upload = require('../config/multerConfig');
const InternshipModel = require('../models/InternshipModel');
const cloudinary = require("../config/cloudinaryConfig")
const InternshipRouter = require('express').Router();

InternshipRouter.post('/upload', upload.single('image'), async(req,res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No image uploaded' 
            });
        }

        // Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { 
                    folder: 'internships', // Optional: organize images in a folder
                    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
                    // Optional transformations
                    transformation: [
                        { width: 800, crop: "limit" }, // Limit image width
                        { quality: "auto" } // Auto-optimize quality
                    ]
                }, 
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Convert buffer to stream
            uploadStream.end(req.file.buffer);
        });

        // Create internship entry
        const internshipEntry = new InternshipModel({
            imageURL: uploadResult.secure_url, // Cloudinary secure URL
            caption: req.body.caption || '', // Optional caption from request body
        });

        // Save to database
        await internshipEntry.save();

        // Respond with success
        res.json({
            success: true,
            message: 'Internship post created successfully',
            data: internshipEntry
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to upload internship post',
            error: error.message 
        });
    }
})

InternshipRouter.get('/all', async(req,res) => {
    try {
        // Fetch all internships, sorted by most recent first
        const internships = await InternshipModel.find()
            .sort({ timestamp: -1 });

        // If no internships found, return appropriate response
        if (internships.length === 0) {
            return res.json({
                success: true,
                message: 'No internship posts found',
                data: []
            });
        }

        // Successful response
        res.json({
            success: true,
            message: 'Internship posts retrieved successfully',
            count: internships.length,
            data: internships
        });

    } catch (error) {
        console.error('Fetch internships error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to retrieve internship posts',
            error: error.message 
        });
    }
})

InternshipRouter.get('/:id', async(req,res) => {
    try {
        // Validate ID format (optional but recommended)
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid internship ID format'
            });
        }

        // Find internship by ID
        const internship = await InternshipModel.findById(req.params.id);

        // Check if internship exists
        if (!internship) {
            return res.json({
                success: false,
                message: 'Internship post not found',
                data: null
            });
        }

        // Successful response
        res.json({
            success: true,
            message: 'Internship post retrieved successfully',
            data: internship
        });

    } catch (error) {
        console.error('Fetch internship error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to retrieve internship post',
            error: error.message 
        });
    }
})

InternshipRouter.delete('/:id', async (req, res) => {
    try {
        // Validate ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid internship ID format'
            });
        }

        // Find and delete the internship
        const deletedInternship = await InternshipModel.findByIdAndDelete(req.params.id);

        // Check if internship was found and deleted
        if (!deletedInternship) {
            return res.json({
                success: false,
                message: 'Internship post not found',
                data: null
            });
        }

        // Successful deletion
        res.json({
            success: true,
            message: 'Internship post deleted successfully',
            data: deletedInternship
        });

    } catch (error) {
        console.error('Delete internship error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to delete internship post',
            error: error.message 
        });
    }
});

// Update internship route
InternshipRouter.put('/:id', upload.single('image'), async (req, res) => {
    try {
        // Validate ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid internship ID format'
            });
        }

        // Prepare update object
        const updateData = {
            caption: req.body.caption
        };

        // If a new image is uploaded
        if (req.file) {
            // Upload image to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        folder: 'internships',
                        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
                        transformation: [
                            { width: 800, crop: "limit" },
                            { quality: "auto" }
                        ]
                    }, 
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            // Add new image URL to update
            updateData.imageURL = uploadResult.secure_url;
        }

        // Find and update the internship
        const updatedInternship = await InternshipModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        // Check if internship was found and updated
        if (!updatedInternship) {
            return res.json({
                success: false,
                message: 'Internship post not found',
                data: null
            });
        }

        // Successful update
        res.json({
            success: true,
            message: 'Internship post updated successfully',
            data: updatedInternship
        });

    } catch (error) {
        console.error('Update internship error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to update internship post',
            error: error.message 
        });
    }
});

module.exports = InternshipRouter;