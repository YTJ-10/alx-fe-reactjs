import axios from 'axios';

const GITHUB_API_BASE = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

// Create axios instance with common headers
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(import.meta.env.VITE_APP_GITHUB_TOKEN && {
      'Authorization': `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`
    })
  },
});

// Search users function
export const searchUsers = async (query) => {
  try {
    const response = await githubAPI.get(`/search/users?q=${query}&per_page=10`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Get user details function
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};