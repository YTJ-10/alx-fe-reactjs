import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const blogPosts = {
  1: { title: 'Getting Started with React Router', content: 'This is the full content of blog post 1 about React Router basics...' },
  2: { title: 'Advanced Routing Patterns', content: 'This is the full content of blog post 2 about advanced routing...' },
  3: { title: 'Dynamic Routing Explained', content: 'This is the full content of blog post 3 about dynamic routing...' },
  4: { title: 'Authentication in React', content: 'This is the full content of blog post 4 about authentication...' },
};

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="blog-post">
        <h2>Blog Post Not Found</h2>
        <p>The requested blog post does not exist.</p>
        <button onClick={() => navigate('/blog')} className="back-btn">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-content">
        <p>{post.content}</p>
        <p><strong>Post ID:</strong> {postId}</p>
      </div>
      <button onClick={() => navigate('/blog')} className="back-btn">
        Back to Blog
      </button>
    </div>
  );
};

export default BlogPost;