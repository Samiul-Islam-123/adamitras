const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        // Not required since events might not have images
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    timestart: {
        type: String,
        required: false
    },
    timeend: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const EventModel = mongoose.model('event', EventSchema);
module.exports = EventModel;