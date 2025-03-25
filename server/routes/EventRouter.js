const upload = require('../config/multerConfig');
const EventModel = require('../models/EventModel');
const cloudinary = require("../config/cloudinaryConfig");
const EventRouter = require('express').Router();

EventRouter.post('/create', upload.single('image'), async(req, res) => {
    try {
        let imageURL = null;

        // If image was uploaded, process it with Cloudinary
        if (req.file) {
            // Upload image to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        folder: 'events', 
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

                // Convert buffer to stream
                uploadStream.end(req.file.buffer);
            });
            
            imageURL = uploadResult.secure_url;
        }

        // Validate required fields
        if (!req.body.title) {
            return res.json({
                success: false,
                message: 'Event title is required'
            });
        }

        if (!req.body.eventStartDate) {
            return res.json({
                success: false,
                message: 'Event start date is required'
            });
        }

        // Create event entry
        const eventEntry = new EventModel({
            imageURL: imageURL,
            title: req.body.title,
            description: req.body.description || '',
            eventStartDate: new Date(req.body.eventStartDate),
            eventEndDate: req.body.eventEndDate ? new Date(req.body.eventEndDate) : null,
            eventStartTime: req.body.eventStartTime || '',
            eventEndTime: req.body.eventEndTime || '',
            registrationStartDate: req.body.registrationStartDate ? new Date(req.body.registrationStartDate) : null,
            registrationEndDate: req.body.registrationEndDate ? new Date(req.body.registrationEndDate) : null,
            registrationStartTime: req.body.registrationStartTime || '',
            registrationEndTime: req.body.registrationEndTime || '',
            location: req.body.location || '',
            createdBy: req.body.createdBy || null // Optional user ID who created the event
        });

        // Save to database
        await eventEntry.save();

        // Respond with success
        res.json({
            success: true,
            message: 'Event created successfully',
            data: eventEntry
        });

    } catch (error) {
        console.error('Create event error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to create event',
            error: error.message 
        });
    }
});

EventRouter.get('/all', async(req, res) => {
    try {
        // Fetch all events, sorted by event start date (upcoming first)
        const events = await EventModel.find()
            .sort({ eventStartDate: 1 });

        // If no events found, return appropriate response
        if (events.length === 0) {
            return res.json({
                success: true,
                message: 'No events found',
                data: []
            });
        }

        // Successful response
        res.json({
            success: true,
            message: 'Events retrieved successfully',
            count: events.length,
            data: events
        });

    } catch (error) {
        console.error('Fetch events error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to retrieve events',
            error: error.message 
        });
    }
});

EventRouter.get('/:id', async(req, res) => {
    try {
        // Validate ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid event ID format'
            });
        }

        // Find event by ID
        const event = await EventModel.findById(req.params.id);

        // Check if event exists
        if (!event) {
            return res.json({
                success: false,
                message: 'Event not found',
                data: null
            });
        }

        // Successful response
        res.json({
            success: true,
            message: 'Event retrieved successfully',
            data: event
        });

    } catch (error) {
        console.error('Fetch event error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to retrieve event',
            error: error.message 
        });
    }
});

EventRouter.delete('/:id', async (req, res) => {
    try {
        // Validate ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid event ID format'
            });
        }

        // Find and delete the event
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);

        // Check if event was found and deleted
        if (!deletedEvent) {
            return res.json({
                success: false,
                message: 'Event not found',
                data: null
            });
        }

        // Successful deletion
        res.json({
            success: true,
            message: 'Event deleted successfully',
            data: deletedEvent
        });

    } catch (error) {
        console.error('Delete event error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to delete event',
            error: error.message 
        });
    }
});

EventRouter.put('/:id', upload.single('image'), async (req, res) => {
    try {
        // Validate ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                success: false,
                message: 'Invalid event ID format'
            });
        }

        // Prepare update object with all possible fields
        const updateData = {};
        
        // Only update fields that are provided
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.description !== undefined) updateData.description = req.body.description;
        
        // Date fields
        if (req.body.eventStartDate) updateData.eventStartDate = new Date(req.body.eventStartDate);
        if (req.body.eventEndDate !== undefined) {
            updateData.eventEndDate = req.body.eventEndDate ? new Date(req.body.eventEndDate) : null;
        }
        
        // Time fields
        if (req.body.eventStartTime !== undefined) updateData.eventStartTime = req.body.eventStartTime;
        if (req.body.eventEndTime !== undefined) updateData.eventEndTime = req.body.eventEndTime;
        
        // Registration fields
        if (req.body.registrationStartDate !== undefined) {
            updateData.registrationStartDate = req.body.registrationStartDate ? new Date(req.body.registrationStartDate) : null;
        }
        if (req.body.registrationEndDate !== undefined) {
            updateData.registrationEndDate = req.body.registrationEndDate ? new Date(req.body.registrationEndDate) : null;
        }
        if (req.body.registrationStartTime !== undefined) updateData.registrationStartTime = req.body.registrationStartTime;
        if (req.body.registrationEndTime !== undefined) updateData.registrationEndTime = req.body.registrationEndTime;
        
        if (req.body.location !== undefined) updateData.location = req.body.location;
        if (req.body.createdBy !== undefined) updateData.createdBy = req.body.createdBy;

        // If a new image is uploaded
        if (req.file) {
            // Upload image to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        folder: 'events',
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

        // Find and update the event
        const updatedEvent = await EventModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        // Check if event was found and updated
        if (!updatedEvent) {
            return res.json({
                success: false,
                message: 'Event not found',
                data: null
            });
        }

        // Successful update
        res.json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent
        });

    } catch (error) {
        console.error('Update event error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to update event',
            error: error.message 
        });
    }
});

// Get upcoming events
EventRouter.get('/upcoming/all', async(req, res) => {
    try {
        const currentDate = new Date();
        
        // Find events where event start date is greater than or equal to current date
        const upcomingEvents = await EventModel.find({
            eventStartDate: { $gte: currentDate }
        }).sort({ eventStartDate: 1 }); // Sort by event start date ascending (soonest first)

        res.json({
            success: true,
            message: 'Upcoming events retrieved successfully',
            count: upcomingEvents.length,
            data: upcomingEvents
        });

    } catch (error) {
        console.error('Fetch upcoming events error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to retrieve upcoming events',
            error: error.message 
        });
    }
});

module.exports = EventRouter;