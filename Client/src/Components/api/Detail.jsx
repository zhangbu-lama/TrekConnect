import axiosInstance from './Index';

// Fetch all details
export const fetchDetails = async () => {
  const response = await axiosInstance.get('/treks/all/');
  return response.data;
};

// Fetch detail by ID
export const fetchDetailById = async (id) => {
  const response = await axiosInstance.get(`/treks/${id}/`);
  return response.data;
};

// Fetch details by place ID
export const fetchDetailsByPlace = async (placeId) => {
  const response = await axiosInstance.get(`/treks/place/${placeId}/`);
  return response.data;
};

// Add detail
export const addDetail = async (data) => {
  const response = await axiosInstance.post('/treks/add/', data);
  return response.data;
};

// Update detail
export const updateDetail = async (id, data) => {
  const response = await axiosInstance.put(`/treks/update/${id}/`, data);
  return response.data;
};

// Delete detail
export const deleteDetail = async (id) => {
  const response = await axiosInstance.delete(`/treks/delete/${id}/`);
  return response.data;
};
