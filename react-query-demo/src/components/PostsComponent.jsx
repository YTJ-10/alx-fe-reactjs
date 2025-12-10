import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use the useQuery hook to fetch data
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error,
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['posts'], // Use queryKey array instead of string
    queryFn: fetchPosts,
    staleTime: 10000, // Data is considered fresh for 10 seconds
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="posts-container">
        <div className="error">Error: {error.message}</div>
        <button onClick={() => refetch()} className="refetch-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="controls">
        <button onClick={() => refetch()} className="refetch-btn" disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh Posts'}
        </button>
        <div className="cache-info">
          {isFetching ? 'Fetching fresh data...' : 'Data loaded from cache'}
        </div>
      </div>

      <div className="posts-list">
        <h2>Posts ({posts?.length || 0})</h2>
        <div className="posts-grid">
          {posts?.slice(0, 12).map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-id">ID: {post.id}</div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body.substring(0, 100)}...</p>
              <div className="post-user">User ID: {post.userId}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h3>React Query Features Demonstrated:</h3>
        <ul>
          <li><strong>Caching:</strong> Click away and come back - data loads instantly from cache</li>
          <li><strong>Stale Time:</strong> Data stays fresh for 10 seconds before refetching</li>
          <li><strong>Automatic Refetching:</strong> Click "Refresh Posts" to manually trigger a refetch</li>
          <li><strong>Loading States:</strong> Shows loading indicator during initial fetch</li>
          <li><strong>Error Handling:</strong> Gracefully handles and displays errors</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;