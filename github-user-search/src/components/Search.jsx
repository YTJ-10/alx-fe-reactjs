import { useState } from 'react';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchParams.username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock data for testing - remove this once basic functionality works
      const mockUsers = [
        {
          id: 1,
          login: 'testuser1',
          avatar_url: 'https://via.placeholder.com/100',
          html_url: 'https://github.com/testuser1',
          public_repos: 10,
          followers: 5,
          following: 2,
          location: 'Test City',
          company: 'Test Corp',
          created_at: '2020-01-01T00:00:00Z'
        },
        {
          id: 2,
          login: 'testuser2',
          avatar_url: 'https://via.placeholder.com/100',
          html_url: 'https://github.com/testuser2',
          public_repos: 20,
          followers: 15,
          following: 8,
          location: 'Test Town',
          company: 'Test Inc',
          created_at: '2019-01-01T00:00:00Z'
        }
      ];
      
      setUsers(mockUsers);
      
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({ username: '' });
    setUsers([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center">GitHub User Search</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={searchParams.username}
                onChange={handleInputChange}
                placeholder="Enter GitHub username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              
              <button
                type="button"
                onClick={clearSearch}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Search Results ({users.length} users found)
          </h2>

          {loading && users.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Safe array mapping */}
          {users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.avatar_url}
                      alt={`${user.login}'s avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.login}</h3>
                      <p className="text-gray-600 text-sm">Repos: {user.public_repos}</p>
                    </div>
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 block"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              Enter a username and click Search to find GitHub users
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;