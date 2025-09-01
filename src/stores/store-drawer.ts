import { create } from 'zustand';

export type SizeDrawer = "sm" | "md" | "lg" | "xl";
type DrawerOpen = {
    title: string;
    description?: string;
    content: React.ReactNode;
    onInteractOutside?: boolean;
    size?: SizeDrawer;
    showCloseButton?: boolean;
    isOpen?: boolean;
};
interface StoreDrawerProps {
    drawers: DrawerOpen[];
    openDrawer: (options: DrawerOpen) => void;
    closeDrawer: () => void;
    closeAllDrawers: () => void;
}

const useStoreDrawer = create<StoreDrawerProps>()(
    (set) => ({
        drawers: [],
        openDrawer: (options: DrawerOpen) =>
            set((state) => ({
                drawers: [...state.drawers, { ...options, isOpen: true }],
            })),
        closeDrawer: () =>
            set((state) => {
                const newDrawers = [...state.drawers];
                if (newDrawers.length === 0) return state;

                // mark drawer as closed (for animation)
                const lastIndex = newDrawers.length - 1;
                newDrawers[lastIndex] = {
                    ...newDrawers[lastIndex],
                    isOpen: false,
                };

                // wait before removing
                setTimeout(() => {
                    set((s) => {
                        const drawersAfterPop = [...s.drawers];
                        drawersAfterPop.pop();
                        return { drawers: drawersAfterPop };
                    });
                }, 300); // ⏱️ duration ต้องตรงกับ Tailwind animate

                return { drawers: newDrawers };
            }),
        closeAllDrawers: () => set({ drawers: [] }),
    })
);

export default useStoreDrawer;