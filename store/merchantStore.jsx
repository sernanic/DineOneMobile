import {create} from 'zustand';

export const useMerchantStore = create((set) => ({
  merchantId: null,
  setMerchantId: (merchantId) => set({ merchantId }),
}));
