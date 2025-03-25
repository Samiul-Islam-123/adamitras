const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    // Comprehensive Event Date Fields
    eventStartDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: false
    },
    eventStartTime: {
        type: String,
        required: false
    },
    eventEndTime: {
        type: String,
        required: false
    },
    
    // Registration Details
    registrationStartDate: {
        type: Date,
        required: false
    },
    registrationEndDate: {
        type: Date,
        required: false
    },
    registrationStartTime: {
        type: String,
        required: false
    },
    registrationEndTime: {
        type: String,
        required: false
    },
    
    location: {
        type: String,
        required: false,
        trim: true
    },
    
    // Metadata
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: false
    },
    
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// // Validation
// EventSchema.path('title').validate(function(value) {
//     return value.length >= 3;
// }, 'Title must be at least 3 characters long');

// // Ensure end date is not before start date
// EventSchema.path('eventEndDate').validate(function(value) {
//     if (value && this.eventStartDate) {
//         return value >= this.eventStartDate;
//     }
//     return true;
// }, 'Event end date must be on or after the start date');

const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;