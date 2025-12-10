import React from 'react';
import { Link } from 'react-router-dom';

const users = [
  { id: 1, name: 'Alice Johnson', role: 'Admin' },
  { id: 2, name: 'Bob Smith', role: 'User' },
  { id: 3, name: 'Carol Davis', role: 'Editor' },
  { id: 4, name: 'David Wilson', role: 'User' },
];

const Users = () => {
  return (
    <div className="users">
      <h2>Users List</h2>
      <p>Click on any user to see their dynamic profile page.</p>
      
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Role:</strong> {user.role}</p>
            <Link to={`/users/${user.id}`} className="view-profile">
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;