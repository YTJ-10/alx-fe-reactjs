import UserCard from './UserCard';

const UserList = ({ users, loading }) => {
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="no-users">No users found. Try searching for GitHub users!</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;