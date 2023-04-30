import Blog from '../models/blogModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all blog blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
    }
);

// @desc    Fetch single blog blog
// @route   GET /api/blog/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

// @desc    Delete a blog blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
        res.json({ message: "Blog removed" });
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

// @desc    Create a blog blog
// @route   POST /api/blog
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, body, author, tags } = req.body;
    const blog = new Blog({
        title,
        body,
        author,
        tags,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Update a blog blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    const { title, body, author, tags } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title;
        blog.body = body;
        blog.author = author;
        blog.tags = tags;
        blog.updatedAt = Date.now();

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

export {
    getBlogs,
    getBlogById,
    deleteBlog,
    createBlog,
    updateBlog,
}