import { useState } from 'react';
import { searchUsers, getUserDetails } from './services/githubAPI';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const searchResult = await searchUsers(query);
      setUsers(searchResult.items);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users and explore their profiles</p>
      </header>
      
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <UserList users={users} loading={loading} />
      </main>
      
      <footer className="app-footer">
        <p>Built with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;