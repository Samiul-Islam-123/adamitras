const mongoose = require('mongoose');

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    tags: [{ type: String }],
    imageURL : {type : String, required : true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

const BlogModel = new mongoose.model('blog', BlogPostSchema)
module.exports = BlogModel