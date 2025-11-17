import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 15000,
});

export const advancedSearchUsers = async (params, page = 1) => {
  try {
    const queryParts = [];

    if (params.username.trim()) {
      queryParts.push(`${params.username.trim()} in:login`);
    }

    if (params.location.trim()) {
      queryParts.push(`location:${params.location.trim()}`);
    }

    if (params.minRepos) {
      queryParts.push(`repos:>=${params.minRepos}`);
    }

    if (params.language.trim()) {
      queryParts.push(`language:${params.language.trim()}`);
    }

    if (params.followers) {
      queryParts.push(`followers:>=${params.followers}`);
    }

    let queryString = queryParts.join(' ');
    if (!queryString.trim()) {
      throw new Error('Please provide at least one search criteria');
    }

    const urlParams = new URLSearchParams({
      q: queryString,
      page: page.toString(),
      per_page: '30'
    });

    if (params.sort !== 'best-match') {
      urlParams.append('sort', params.sort);
      urlParams.append('order', params.order);
    }

    const response = await githubAPI.get(`/search/users?${urlParams}`);

    if (response.status === 200) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.log('API Response:', response.data);
      }
      
      const usersWithDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userDetails = await githubAPI.get(`/users/${user.login}`);
            return {
              ...user,
              ...userDetails.data
            };
          } catch (error) {
            // Only log in development
            if (import.meta.env.DEV) {
              console.warn(`Could not fetch details for user: ${user.login}`);
            }
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
    // Improved error handling
    let errorMessage = 'Failed to search users';
    
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 403:
          errorMessage = 'GitHub API rate limit exceeded. Please try again in a few minutes.';
          break;
        case 422:
          errorMessage = 'Invalid search parameters. Please check your filters.';
          break;
        case 503:
          errorMessage = 'GitHub API is temporarily unavailable. Please try again later.';
          break;
        case 404:
          errorMessage = 'No users found matching your criteria.';
          break;
        default:
          errorMessage = error.response?.data?.message || 'Network error occurred';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

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