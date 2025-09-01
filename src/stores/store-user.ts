// stores/user-store.ts
import { Session } from 'next-auth';
import { create } from 'zustand';

interface UserState {
  user: Session | null;
  setUser: (user: Session | null) => void;
  clearUser: () => void;
}

export const useStoreUser = create<UserState>((set) => ({
  user: null,
  status: "unauthenticated",
  setUser: (user) => {
    set({ user});
  },
  clearUser: () => set({ user: null}),

}));
