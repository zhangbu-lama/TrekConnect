import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,  // Load user from localStorage
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,  // Load auth state from localStorage
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    localStorage.setItem('user', JSON.stringify(user));  // Save user to localStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(!!user));  // Save auth state to localStorage
  },
  clearUser: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');  // Remove user from localStorage
    localStorage.removeItem('isAuthenticated');  // Remove auth state from localStorage
  },
}));

export default useAuthStore;
