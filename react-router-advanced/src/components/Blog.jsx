import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'Getting Started with React Router', excerpt: 'Learn how to set up routing in your React applications...' },
  { id: 2, title: 'Advanced Routing Patterns', excerpt: 'Explore nested routes, protected routes, and more...' },
  { id: 3, title: 'Dynamic Routing Explained', excerpt: 'How to handle variable URLs in your React apps...' },
  { id: 4, title: 'Authentication in React', excerpt: 'Implementing protected routes and user authentication...' },
];

const Blog = () => {
  return (
    <div className="blog">
      <h2>Blog Posts</h2>
      <p>Click on any post to see dynamic routing in action.</p>
      
      <div className="posts-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;