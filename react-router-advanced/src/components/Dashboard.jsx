import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Protected Dashboard</h2>
      <div className="dashboard-content">
        <p>This is a protected route that requires authentication.</p>
        <p>You can only see this page if you're logged in.</p>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">1,234</p>
          </div>
          <div className="stat-card">
            <h3>Active Sessions</h3>
            <p className="stat-number">89</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p className="stat-number">$12,456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;