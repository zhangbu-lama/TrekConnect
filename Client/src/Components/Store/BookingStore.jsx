import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  selectedBooking: null,
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  clearSelectedBooking: () => set({ selectedBooking: null }),

  formState: {},
  setFormState: (formData) => set({ formState: formData }),
  updateFormField: (field, value) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [field]: value,
      },
    })),
}));
