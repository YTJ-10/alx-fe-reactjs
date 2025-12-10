import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Advanced React Router Demo</h2>
      <p>This application demonstrates advanced routing techniques in React.</p>
      
      <div className="features">
        <h3>Try these features:</h3>
        <ul>
          <li><Link to="/profile">Profile with Nested Routes</Link> - Click to see nested routing</li>
          <li><Link to="/blog">Blog with Dynamic Routing</Link> - Click on posts for dynamic routes</li>
          <li><Link to="/users">Users with Dynamic URLs</Link> - Click on users for dynamic profiles</li>
          <li><Link to="/dashboard">Protected Dashboard</Link> - Requires authentication (currently blocked)</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;