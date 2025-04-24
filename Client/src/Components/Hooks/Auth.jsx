import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser, logoutUser } from '../api/Auth';
import useAuthStore from '../Store/AuthStore';

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => console.log('Registration successful:', data),
    onError: (error) => console.error('Error registering:', error.response?.data?.error || error.message),
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      console.log('Login successful:', data);
      setUser({ email: variables.email });
    },
    onError: (error) => console.error('Error logging in:', error.response?.data?.error || error.message),
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      console.log('Logout successful:', data);
      clearUser();
    },
    onError: (error) => console.error('Error logging out:', error.response?.data?.error || error.message),
  });
};