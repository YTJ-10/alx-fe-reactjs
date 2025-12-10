import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const userProfiles = {
  1: { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinDate: '2022-03-15' },
  2: { name: 'Bob Smith', email: 'bob@example.com', role: 'User', joinDate: '2023-01-20' },
  3: { name: 'Carol Davis', email: 'carol@example.com', role: 'Editor', joinDate: '2022-11-05' },
  4: { name: 'David Wilson', email: 'david@example.com', role: 'User', joinDate: '2023-05-30' },
};

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = userProfiles[userId];

  if (!user) {
    return (
      <div className="user-profile">
        <h2>User Not Found</h2>
        <p>The requested user does not exist.</p>
        <button onClick={() => navigate('/users')} className="back-btn">
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>{user.name}'s Profile</h2>
      <div className="profile-details">
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Join Date:</strong> {user.joinDate}</p>
      </div>
      <button onClick={() => navigate('/users')} className="back-btn">
        Back to Users
      </button>
    </div>
  );
};

export default UserProfile;