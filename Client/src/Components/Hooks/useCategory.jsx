// src/hooks/useCategory.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../api/Category';  // Correct the imports

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,  // Use the imported fetchCategories function
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: (newCategory) => {
      // Optimistically update the local cache
      queryClient.setQueryData(['catego ries'], (oldCategories) =>
        oldCategories ? [...oldCategories, newCategory] : [newCategory]
      );
      // Invalidate to refetch from server, ensuring sync
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error) => {
      console.error('Error adding category:', error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, data }) => updateCategory({ _id, data }),
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(['categories'], (oldCategories) =>
        oldCategories
          ? oldCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          : [updatedCategory]
      );
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error) => {
      console.error('Error updating category:', error);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries(['categories']);
      const previousCategories = queryClient.getQueryData(['categories']);
      queryClient.setQueryData(['categories'], (oldCategories) =>
        oldCategories ? oldCategories.filter((category) => category.id !== id) : []
      );
      return { previousCategories };
    },
    onError: (error, id, context) => {
      console.error('Error deleting category:', error);
      queryClient.setQueryData(['categories'], context.previousCategories);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};
