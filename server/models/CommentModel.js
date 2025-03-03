const mongoose = require('mongoose');

// Comment Schema
const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
    createdAt: { type: Date, default: Date.now }
  });

  const CommentModel = new mongoose.model('comment', CommentSchema);

  module.exports = CommentModel;