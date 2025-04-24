import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  filter: '',
  setFilter: (newFilter) => set({ filter: newFilter }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;