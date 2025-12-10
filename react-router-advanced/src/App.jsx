import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Users from './components/Users';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {
  // State to simulate authentication (in real app, this would come from context/state)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Advanced React Router Demo</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            
            {/* Blog Routes with Dynamic Routing */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            
            {/* Users Routes with Dynamic Routing */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            
            {/* Profile Route with Nested Routes */}
            <Route 
              path="/profile/*" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route index element={<ProfileDetails />} />
            </Route>
            
            {/* Dashboard Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        <div className="instructions">
          <h3>Features Demonstrated:</h3>
          <ul>
            <li><strong>Nested Routes:</strong> Profile has nested routes (ProfileDetails, ProfileSettings)</li>
            <li><strong>Dynamic Routing:</strong> Blog posts (/blog/:postId) and user profiles (/users/:userId) use URL parameters</li>
            <li><strong>Protected Routes:</strong> Profile and Dashboard require authentication</li>
            <li><strong>404 Handling:</strong> Custom NotFound page for invalid routes</li>
            <li><strong>Programmatic Navigation:</strong> Using useNavigate hook in components</li>
          </ul>
          
          <div className="auth-status">
            <h4>Authentication Status: {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}</h4>
            <p>
              <strong>To test protected routes:</strong><br/>
              1. Click "Login" in the navbar<br/>
              2. Click the Login button on the Login page<br/>
              3. Now you can access Profile and Dashboard
            </p>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;