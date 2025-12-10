import React from 'react';

const ProfileDetails = () => {
  return (
    <div className="profile-details">
      <h3>Profile Details</h3>
      <div className="details-card">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Member Since:</strong> January 2023</p>
        <p><strong>Bio:</strong> React developer passionate about building amazing web applications.</p>
      </div>
    </div>
  );
};

export default ProfileDetails;