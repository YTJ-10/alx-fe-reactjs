import React from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <p>This component demonstrates nested routing.</p>
      
      <div className="profile-layout">
        <div className="profile-sidebar">
          <nav className="profile-nav">
            <Link to="details">Profile Details</Link>
            <Link to="settings">Profile Settings</Link>
            <button onClick={() => navigate('/')} className="back-btn">
              Back to Home
            </button>
          </nav>
        </div>
        
        <div className="profile-content">
          <Outlet /> {/* This renders the nested routes */}
        </div>
      </div>
    </div>
  );
};

// This would be the nested routes configuration (usually in App.jsx, but showing here for clarity)
export const ProfileRoutes = () => (
  <Routes>
    <Route path="profile" element={<Profile />}>
      <Route path="details" element={<ProfileDetails />} />
      <Route path="settings" element={<ProfileSettings />} />
      <Route index element={<ProfileDetails />} />
    </Route>
  </Routes>
);

export default Profile;