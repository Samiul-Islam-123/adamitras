const express = require("express");
const BlogRoutes = express.Router();
const BlogModel = require("../models/BlogModel");
const CommentModel = require("../models/CommentModel");

// Create a new blog post
BlogRoutes.post("/post-blog", async (req, res) => {
  try {
    const { title, content, author, tags, imageURL } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and author are required.",
        data: null,
      });
    }

    const newBlog = new BlogModel({ title, content, author, tags, imageURL });
    await newBlog.save();
    res.json({ success: true, message: "Blog posted successfully", data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

// Get a single blog post by ID
BlogRoutes.get("/blogs/:ID", async (req, res) => {
  try {
    const { ID } = req.params;

    if (!ID) {
      return res.status(400).json({ success: false, message: "Blog ID is required.", data: null });
    }

    const blog = await BlogModel.findById(ID).populate("author").populate("comments");
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found", data: null });
    }
    res.json({ success: true, message: "Blog retrieved successfully", data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

// Get all blog posts
BlogRoutes.get("/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("author");
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found", data: [] });
    }
    res.json({ success: true, message: "Blogs retrieved successfully", data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

// Update a blog post
BlogRoutes.put("/update-blog/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const { title, content, tags ,author} = req.body;

    if (!ID) {
      return res.status(400).json({ success: false, message: "Blog ID is required.", data: null });
    }
    
    if (!title && !content && !tags) {
      return res.status(400).json({
        success: false,
        message: "At least one field (title, content, or tags) must be provided for update.",
        data: null,
      });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      ID,
      { title, content, tags, updatedAt: Date.now(), author },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found", data: null });
    }

    res.json({ success: true, message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

// Delete a blog post
BlogRoutes.delete("/delete-blog/:ID", async (req, res) => {
  try {
    const { ID } = req.params;

    if (!ID) {
      return res.status(400).json({ success: false, message: "Blog ID is required.", data: null });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(ID);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found", data: null });
    }

    await CommentModel.deleteMany({ post: ID }); // Delete associated comments
    res.json({ success: true, message: "Blog deleted successfully", data: deletedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

module.exports = BlogRoutes;
