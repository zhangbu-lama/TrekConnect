import axiosInstance from './Index';

export const registerUser = async (data) => {
    const response = await axiosInstance.post('/signup/register/', data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axiosInstance.post('/signup/login/', data);
    return response.data;
};

export const logoutUser = async () => {
    const response = await axiosInstance.post('/signup/logout/', {});
    return response.data;
};