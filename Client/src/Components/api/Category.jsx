import axiosInstance from './Index';

export const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories/all/');
  return response.data;
};

export const addCategory = async (data) => {
  const response = await axiosInstance.post('/categories/add/', data);
  return response.data;
};

export const updateCategory = async ({ id, data }) => {
  if (typeof id !== 'number') {
    throw new Error(`Invalid category ID: ${id}`);
  }
  const response = await axiosInstance.put(`/categories/update/${id}/`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  if (typeof id !== 'number') {
    throw new Error(`Invalid category ID: ${id}`);
  }
  const response = await axiosInstance.delete(`/categories/delete/${id}/`);
  return response.data;
};

export const fetchPlacesByCategory = async (categoryId) => {
  const response = await axiosInstance.get(`/places/all/?category=${categoryId}`);
  return response.data;
};
