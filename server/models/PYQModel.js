const mongoose = require('mongoose');

const PYQSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    title : {
        type : String,
    }
})

const PYQModel = new mongoose.model('pyq', PYQSchema);
module.exports = PYQModel