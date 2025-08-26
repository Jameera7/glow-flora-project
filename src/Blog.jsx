// Blog.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blog() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Replace with your backend URL if hosted elsewhere
  const API_URL = 'http://localhost:5000/posts';

  // Load posts from backend on mount
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setContent('');
    setImage(null);
    setEditingId(null);
  };

  // Add or update post via backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const postData = {
      title,
      subtitle,
      content,
      image,
      date: new Date(),
    };

    try {
      if (editingId) {
        const res = await axios.put(`${API_URL}/${editingId}`, postData);
        setBlogs(blogs.map(blog => (blog.id === editingId ? res.data : blog)));
        resetForm();
      } else {
        const res = await axios.post(API_URL, postData);
        setBlogs([res.data, ...blogs]);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post. See console for details.');
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setImage(blog.image);
        setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    const password = prompt('Enter password to delete this post:');
    const correctPassword = 'admin123';
    if (password !== correctPassword) {
      alert('Incorrect password. Delete aborted.');
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (editingId === id) resetForm();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. See console for details.');
    }
  };

  return (
    <div className="container" style={{ margin: 'auto', maxWidth: '700px', padding: '20px' }}>
      <h1>Simple Blog App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Enter Blog Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          rows={5}
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '15px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          {editingId ? 'Update Post' : 'Post Blog'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ padding: '10px 20px', marginLeft: '10px' }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs yet. Start posting!</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
              }}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '12px' }}
                />
              )}
              <h2>{blog.title}</h2>
              <h4 style={{ color: '#666' }}>{blog.subtitle}</h4>
              <p>{blog.content}</p>
              <p style={{ fontStyle: 'italic', color: '#999' }}>
                Posted on: {new Date(blog.date).toLocaleString()}
              </p>
              <button onClick={() => handleEdit(blog)} style={{ marginRight: '8px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;