# Flower Blog - Server Setup Guide

This guide will help you set up the backend server for your Flower Blog application.

## Prerequisites

1. **Node.js** (version 14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)

## Installation

1. Install dependencies:
```bash
npm install
```

## MongoDB Setup

### Option 1: Local MongoDB Installation
1. Download and install MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - On Windows: Run `mongod` from command prompt
   - On macOS: `brew services start mongodb-community`
   - On Linux: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get the connection string
3. Set the connection string as environment variable:
```bash
export MONGODB_URI="your_mongodb_atlas_connection_string"
```

## Running the Application

### Method 1: Run Server Only
```bash
npm run server
```
Server will start on http://localhost:5000

### Method 2: Run Both Server and Frontend (Recommended)
```bash
npm run dev
```
This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

## API Endpoints

- `GET /posts` - Get all blog posts
- `GET /posts/:id` - Get single blog post
- `POST /posts` - Create new blog post
- `PUT /posts/:id` - Update blog post
- `DELETE /posts/:id` - Delete blog post
- `GET /health` - Health check

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/flower-blog)

## Testing the API

You can test the API using tools like:
- Postman
- Thunder Client (VSCode extension)
- curl commands

Example curl commands:
```bash
# Get all posts
curl http://localhost:5000/posts

# Create new post
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"This is a test post"}'

# Health check
curl http://localhost:5000/health
```

## Troubleshooting

1. **MongoDB connection issues**: Ensure MongoDB is running and accessible
2. **Port conflicts**: Change PORT environment variable if 5000 is already in use
3. **CORS issues**: The server is configured to allow requests from any origin during development

## Production Deployment

For production, consider:
1. Using environment variables for sensitive data
2. Adding authentication/authorization
3. Setting up proper CORS configuration
4. Using a process manager like PM2
5. Setting up MongoDB Atlas for cloud database
