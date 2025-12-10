import React, { useState } from 'react';

const ProfileSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <div className="settings-form">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        
        <div className="setting-item">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
  );
};

export default ProfileSettings;