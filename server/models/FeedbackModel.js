const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    username : String,
    email : String,
    timestamp :{
        type : Date,
        default : Date.now
    },
    message : String
});

const FeedbackModel = new mongoose.model('feedback', FeedbackSchema);
module.exports = FeedbackModel;