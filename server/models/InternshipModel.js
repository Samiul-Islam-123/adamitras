const mongoose = require('mongoose');


const InternshipSchema = new mongoose.Schema({
    imageURL : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

const InternshipModel = new mongoose.model('internship', InternshipSchema);
module.exports = InternshipModel;