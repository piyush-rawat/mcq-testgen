import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  access_token: string | null;
  setToken: (token: string) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      access_token: null,
      setToken: (t) => set({ access_token: t }),
      clearAuthData: () => set({ user: null, access_token: null }),
    }),
    {
      name: "authStore",
    }
  )
);

interface LoaderStore {
  isLoading: boolean;
  setLoading: (bool: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
