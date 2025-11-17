const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      </div>
      <div className="user-info">
        <h3 className="user-name">{user.login}</h3>
        {user.name && <p className="user-fullname">{user.name}</p>}
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          {user.followers !== undefined && (
            <span className="stat">Followers: {user.followers}</span>
          )}
          {user.public_repos !== undefined && (
            <span className="stat">Repos: {user.public_repos}</span>
          )}
        </div>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;