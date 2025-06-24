const API_BASE_URL = 'http://localhost:3000/api';

// Generic fetch wrapper with error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User API calls
export const userAPI = {
  getAll: () => apiCall('/users'),
  create: (userData) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (id, userData) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (id) => apiCall(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Skills API calls
export const skillsAPI = {
  getAll: () => apiCall('/skills'),
};

// Training modules API calls
export const trainingAPI = {
  getAll: () => apiCall('/training-modules'),
};

// Placement statistics API calls
export const statsAPI = {
  getStats: () => apiCall('/placement-stats'),
};

// Health check
export const healthAPI = {
  check: () => apiCall('/health'),
};

export default {
  userAPI,
  skillsAPI,
  trainingAPI,
  statsAPI,
  healthAPI,
}; 