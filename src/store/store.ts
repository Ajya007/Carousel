import {create} from 'zustand';
import axios from 'axios';

// Define the types for your store state
interface Store {
  data: any[] | null | undefined;
  loading: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

// Create the store with the correct typing
const useStore = create<Store>((set) => ({
  data: null,
  loading: false,
  error: null,

  // Action to fetch data from an API
  fetchData: async (url: string) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(url);
      set({ data: response.data, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useStore;