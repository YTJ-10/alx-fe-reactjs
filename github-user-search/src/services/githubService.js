import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with common configuration
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data object
 */
export const fetchUserData = async (username) => {
  try {
    if (!username || !username.trim()) {
      throw new Error('Username is required');
    }

    const response = await githubAPI.get(`/users/${username.trim()}`);
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API returned status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      } else if (error.response?.status === 403) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 500) {
        throw new Error('GitHub API is experiencing issues. Please try again later.');
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
    
    // Re-throw the error with a generic message if not handled above
    throw new Error(error.message || 'Failed to fetch user data');
  }
};

// Optional: Add a function to check rate limits
export const getRateLimit = async () => {
  try {
    const response = await githubAPI.get('/rate_limit');
    return response.data;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
};