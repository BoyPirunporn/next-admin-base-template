// stores/useMenuStore.ts
import { MenuPermissionNode } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MenuState = {
    menus: MenuPermissionNode[] | null;
    loading: boolean;
    setMenus: (menus: MenuPermissionNode[]) => void;
    clear: () => void;
};

export const useStoreMenu = create<MenuState>()(
    persist(
        (set) => ({
            menus: null,
            loading: false,
            setMenus: (menus) => set({ menus }),
            clear: () => set({ menus: null }),
        }),
        { name: "app-menus" } // localStorage key
    )
);
