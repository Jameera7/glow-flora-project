import React, { useState } from 'react';

function Blog() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store base64 string
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;

    const newBlog = {
      id: Date.now(),
      title,
      subtitle,
      content,
      image,
    };

    setBlogs([newBlog, ...blogs]);
    setTitle('');
    setSubtitle('');
    setContent('');
    setImage(null);
  };

  return (
    <div className="container">
      <h1>Simple Blog App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Blog Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <textarea
          rows="5"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Post Blog</button>
      </form>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs yet. Start posting</p>
        ) : (
          blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-image"
                />
              )}
              <h2 className="blog-title">{blog.title}</h2>
              <h4 className="blog-subtitle">{blog.subtitle}</h4>
              <p className="blog-content">{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;