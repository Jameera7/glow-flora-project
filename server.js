const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// In-memory database
let blogs = [];
let currentId = 1;

// API Routes

// GET all posts
app.get('/posts', (req, res) => {
  res.json(blogs);
});

// POST new post
app.post('/posts', (req, res) => {
  const { title, subtitle, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: currentId++,
    title,
    subtitle: subtitle || '',
    content,
    image: image || null,
    date: new Date()
  };

  blogs.push(newPost);
  res.status(201).json(newPost);
});

// PUT update post
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, subtitle, content, image } = req.body;

  const postIndex = blogs.findIndex(blog => blog.id === parseInt(id));
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const updatedPost = {
    id: parseInt(id),
    title,
    subtitle: subtitle || '',
    content,
    image: image || null,
    date: new Date()
  };

  blogs[postIndex] = updatedPost;
  res.json(updatedPost);
});

// DELETE post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = blogs.findIndex(blog => blog.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  blogs.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/posts`);
});

module.exports = app;
