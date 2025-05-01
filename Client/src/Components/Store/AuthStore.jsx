import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  adminToken: null,
  error: null,
  loading: false,

  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup', userData);
      set({ loading: false, user: response.data.data });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to sign up';
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', credentials, {
        withCredentials: true,
      });
      set({ loading: false, user: response.data.data });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to log in';
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  adminLogin: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/admin/login', credentials);
      set({ loading: false, adminToken: response.data.data.token });
      return response.data.data;
    } catch (error) {
      console.error('Admin login error details:', error); // Detailed debug log
      let errorMessage = 'Failed to log in as admin';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Check if the backend is running or CORS settings.';
      } else {
        errorMessage = `Request error: ${error.message}`;
      }
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    set({ user: null, adminToken: null, error: null });
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
}));

export default useAuthStore;
