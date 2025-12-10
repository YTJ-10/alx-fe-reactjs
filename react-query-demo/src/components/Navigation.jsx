import React from 'react';
import './Navigation.css';

const Navigation = ({ showPosts, setShowPosts }) => {
  return (
    <div className="navigation">
      <div className="nav-buttons">
        <button 
          onClick={() => setShowPosts(true)} 
          className={showPosts ? 'active' : ''}
        >
          Show Posts
        </button>
        <button 
          onClick={() => setShowPosts(false)} 
          className={!showPosts ? 'active' : ''}
        >
          Hide Posts
        </button>
      </div>
      <div className="nav-instruction">
        {showPosts 
          ? "Posts are visible. Click 'Hide Posts', wait, then 'Show Posts' to see caching in action."
          : "Posts are hidden. Click 'Show Posts' to see data load from cache."
        }
      </div>
    </div>
  );
};

export default Navigation;