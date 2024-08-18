import {create} from 'zustand';
import { Session } from '@supabase/supabase-js'; // Import type for reference, but not used in JS

export const useAuthStore = create((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
