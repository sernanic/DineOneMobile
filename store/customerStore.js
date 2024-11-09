import { create } from 'zustand'

export const useCustomerStore = create((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
  clearCustomer: () => set({ customer: null }),
})) 