import { create } from 'zustand';

export type SizeModal = "sm" | "md" | "lg" | "xl";
type ModelOpen = {
    title: string;
    description?: string;
    content: React.ReactNode;
    onInteractOutside?: boolean;
    size?: SizeModal;
    showCloseButton?: boolean;
    isOpen?: boolean;
};
interface StoreModalProps {
    modals: ModelOpen[];
    openModal: (options: ModelOpen) => void;
    closeModal: () => void;
    closeAllModals: () => void;
}

const useStoreModal = create<StoreModalProps>()(
    (set) => ({
        modals: [],
        openModal: (options: ModelOpen) =>
            set((state) => ({
                modals: [...state.modals, { ...options, isOpen: true }],
            })),
        closeModal: () =>
            set((state) => {
                const newModals = [...state.modals];
                if (newModals.length === 0) return state;

                // mark drawer as closed (for animation)
                const lastIndex = newModals.length - 1;
                newModals[lastIndex] = {
                    ...newModals[lastIndex],
                    isOpen: false,
                };

                // wait before removing
                setTimeout(() => {
                    set((s) => {
                        const drawersAfterPop = [...s.modals];
                        drawersAfterPop.pop();
                        return { modals: drawersAfterPop };
                    });
                }, 300); // ⏱️ duration ต้องตรงกับ Tailwind animate
                return { modals: newModals };
            }),
        closeAllModals: () => set({ modals: [] }),
    })
);

export default useStoreModal;