import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="state-message loading">
          Loading...
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="state-message error">
          {error}
        </div>
      )}

      {/* Results Display */}
      {userData && !loading && (
        <div className="user-results">
          <h2>User Found</h2>
          <div className="user-card">
            <div className="user-avatar">
              <img 
                src={userData.avatar_url} 
                alt={`${userData.login}'s avatar`} 
                className="avatar"
              />
            </div>
            <div className="user-info">
              <h3 className="user-name">{userData.name || userData.login}</h3>
              <p className="user-login">@{userData.login}</p>
              {userData.bio && (
                <p className="user-bio">{userData.bio}</p>
              )}
              <div className="user-stats">
                <div className="stat">
                  <strong>{userData.public_repos}</strong>
                  <span>Repositories</span>
                </div>
                <div className="stat">
                  <strong>{userData.followers}</strong>
                  <span>Followers</span>
                </div>
                <div className="stat">
                  <strong>{userData.following}</strong>
                  <span>Following</span>
                </div>
              </div>
              <div className="user-links">
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  View GitHub Profile
                </a>
                {userData.blog && (
                  <a 
                    href={userData.blog} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="blog-link"
                  >
                    Website
                  </a>
                )}
              </div>
              {userData.location && (
                <p className="user-location">📍 {userData.location}</p>
              )}
              {userData.company && (
                <p className="user-company">🏢 {userData.company}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;