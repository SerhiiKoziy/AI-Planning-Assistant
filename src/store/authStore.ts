import { create } from 'zustand';

import type { User } from '../features/auth/types';

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => {
    // TODO: persist token, e.g. localStorage
    set({ token, user });
  },
  logout: () => {
    // TODO: clear persisted token
    set({ token: null, user: null });
  },
}));
