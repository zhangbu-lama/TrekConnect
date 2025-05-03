import { create } from 'zustand';
import axios from 'axios';
import { getCookie } from './Cookieutils';

const useAuthStore = create((set) => ({
  user: null,
  adminToken: null,
  error: null,
  loading: false,
  initializing: true,

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
      const token = response.data.data.token;
      localStorage.setItem('adminToken', token);
      set({ loading: false, adminToken: token });
      return response.data;
      set({ loading: false, adminToken: response.data.data.token });
      return response.data.data;
    } catch (error) {
      console.error('Admin login error:', error);
      let errorMessage = 'Failed to log in as admin';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Check backend or CORS.';
      } else {
        errorMessage = `Request error: ${error.message}`;
      }
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    set({ user: null, adminToken: null, error: null });
    localStorage.removeItem('adminToken');
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/refresh', {}, {
        withCredentials: true,
      });
      set({ user: response.data.data });
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      set({ user: null });
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  initializeAuth: async () => {
    set({ initializing: true, error: null });
    try {
      // Check for user (access_token in cookies)
      const accessToken = getCookie('access_token');
      if (accessToken) {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/auth/me', {
            withCredentials: true,
          });
          set({ user: response.data.data });
        } catch (error) {
          console.warn('Access token invalid, attempting refresh:', error);
          await useAuthStore.getState().refresh();
        }
      }

      // Check for admin (adminToken in localStorage)
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        const response = await axios.get('http://localhost:8000/api/v1/auth/admin/me', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (response.data.data.admin) {
          set({ adminToken });
        } else {
          localStorage.removeItem('adminToken');
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      set({ user: null, adminToken: null });
      localStorage.removeItem('adminToken');
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } finally {
      set({ initializing: false });
    }
  },
}));

export default useAuthStore;
