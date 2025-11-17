import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';
import UserList from './UserList';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    followers: '',
    sort: 'best-match',
    order: 'desc'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (newPage = 1) => {
    if (!searchParams.username.trim() && !searchParams.location.trim()) {
      setError('Please enter at least a username or location to search');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await advancedSearchUsers(searchParams, newPage);
      
      // Safely handle the response data
      const userItems = result?.items || [];
      
      if (newPage === 1) {
        setUsers(userItems);
      } else {
        setUsers(prev => [...prev, ...userItems]);
      }
      
      setHasMore(userItems.length === 30); // GitHub API returns max 30 items per page
      setPage(newPage);
    } catch (err) {
      setError(err.message || 'Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    handleSearch(1);
  };

  const handleLoadMore = () => {
    handleSearch(page + 1);
  };

  const clearSearch = () => {
    setSearchParams({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      followers: '',
      sort: 'best-match',
      order: 'desc'
    });
    setUsers([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-github-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            GitHub User Search
          </h1>
          <p className="text-gray-300 text-center text-lg">
            Discover GitHub users with advanced filtering
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchParams.username}
                  onChange={handleInputChange}
                  placeholder="Enter username (e.g., octocat)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="Enter location (e.g., San Francisco)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Advanced Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Programming Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Followers
                </label>
                <input
                  type="number"
                  id="followers"
                  name="followers"
                  value={searchParams.followers}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Sort Options Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={searchParams.sort}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                >
                  <option value="best-match">Best Match</option>
                  <option value="followers">Followers</option>
                  <option value="repositories">Repositories</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <select
                  id="order"
                  name="order"
                  value={searchParams.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-github-blue focus:border-transparent transition-colors"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading || (!searchParams.username.trim() && !searchParams.location.trim())}
                className="flex-1 bg-github-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search Users'
                )}
              </button>
              
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Results - Pass users array safely */}
        <UserList users={users} loading={loading} />

        {/* Load More Button */}
        {hasMore && users.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-white border border-github-blue text-github-blue py-3 px-8 rounded-lg font-semibold hover:bg-github-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Load More Users'}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built with React, Tailwind CSS & GitHub API</p>
        </div>
      </footer>
    </div>
  );
};

export default Search;