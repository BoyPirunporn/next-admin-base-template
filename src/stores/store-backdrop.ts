// @/stores/store-backdrop.ts
import { create } from 'zustand';

type BackdropStore = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

export const useStoreBackdrop = create<BackdropStore>((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));