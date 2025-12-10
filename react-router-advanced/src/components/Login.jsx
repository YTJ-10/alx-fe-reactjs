import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    onLogin(); // Call the login function from App.jsx
    alert('Login successful!');
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <h2>Login Page</h2>
      <p>This simulates authentication. In a real app, this would connect to an auth service.</p>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        
        <button type="submit" className="login-btn">Login</button>
      </form>
      
      <div className="demo-note">
        <p><strong>Demo Credentials:</strong> Any username/password will work</p>
        <p>After login, you'll be redirected to the Dashboard</p>
      </div>
    </div>
  );
};

export default Login;