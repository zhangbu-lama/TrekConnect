import { create } from "zustand";

const useProductStore = create((set) => ({
  products: JSON.parse(localStorage.getItem("products")) || [],

  addProduct: (product) =>
    set((state) => {
      const updated = [...state.products, product];
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),

  updateProduct: (updatedProduct) =>
    set((state) => {
      const updated = state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),

  deleteProduct: (id) =>
    set((state) => {
      const updated = state.products.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),
}));

export default useProductStore;
