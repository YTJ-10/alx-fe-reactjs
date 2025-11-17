import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 15000,
});

/**
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search for
 * @param {string} params.location - Location filter
 * @param {string} params.minRepos - Minimum repositories
 * @param {string} params.language - Programming language
 * @param {string} params.followers - Minimum followers
 * @param {string} params.sort - Sort field (followers, repositories, joined)
 * @param {string} params.order - Sort order (asc, desc)
 * @param {number} page - Page number
 * @returns {Promise<Object>} Search results
 */
export const advancedSearchUsers = async (params, page = 1) => {
  try {
    const queryParts = [];

    // Add username search
    if (params.username.trim()) {
      queryParts.push(`${params.username.trim()} in:login`);
    }

    // Add location filter
    if (params.location.trim()) {
      queryParts.push(`location:${params.location.trim()}`);
    }

    // Add repository count filter
    if (params.minRepos) {
      queryParts.push(`repos:>=${params.minRepos}`);
    }

    // Add language filter
    if (params.language.trim()) {
      queryParts.push(`language:${params.language.trim()}`);
    }

    // Add followers filter
    if (params.followers) {
      queryParts.push(`followers:>=${params.followers}`);
    }

    // Build final query string
    let queryString = queryParts.join(' ');
    if (!queryString.trim()) {
      throw new Error('Please provide at least one search criteria');
    }

    // Build URL parameters
    const urlParams = new URLSearchParams({
      q: queryString,
      page: page.toString(),
      per_page: '30'
    });

    // Add sort and order if not best-match
    if (params.sort !== 'best-match') {
      urlParams.append('sort', params.sort);
      urlParams.append('order', params.order);
    }

    const response = await githubAPI.get(`/search/users?${urlParams}`);

    if (response.status === 200) {
      // Enhanced: Fetch additional details for each user
      const usersWithDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userDetails = await githubAPI.get(`/users/${user.login}`);
            return {
              ...user,
              ...userDetails.data
            };
          } catch (error) {
            console.warn(`Could not fetch details for user: ${user.login}`);
            return user;
          }
        })
      );

      return {
        ...response.data,
        items: usersWithDetails
      };
    } else {
      throw new Error(`API returned status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
      } else if (error.response?.status === 422) {
        throw new Error('Invalid search parameters. Please check your filters.');
      } else if (error.response?.status === 503) {
        throw new Error('GitHub API is temporarily unavailable. Please try again later.');
      }
    }
    throw new Error(error.message || 'Failed to search users');
  }
};

/**
 * Get detailed user information
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User details
 */
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user details');
  }
};

/**
 * Check GitHub API rate limits
 * @returns {Promise<Object>} Rate limit information
 */
export const getRateLimit = async () => {
  try {
    const response = await githubAPI.get('/rate_limit');
    return response.data;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
};