// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  formData: {
    name: '',
    email: '',
    city: '',
    country: '',
    phone: '',
  },
  entries: [],
  editingEntry: {},
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setEntries: (entries) => set({ entries }),
  setEditingEntry: (entry) => set({ editingEntry: entry }),
}));

export default useStore;
