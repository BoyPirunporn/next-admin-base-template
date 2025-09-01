"use client";
import { EnabledLocale, locales } from '@/i18n/routing';
import { PermissionNode } from 'next-auth/jwt';
import React, { createContext, useContext, useMemo } from "react";

type PermissionAction = 'view' | 'create' | 'update' | 'delete';

type PermissionContextType = {
    permissions: PermissionNode[];
    findPermissionByPath: (path: string) => PermissionNode | null;
    can: (action: PermissionAction, path: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

interface PermissionProviderProps {
    children: React.ReactNode;
    permissions: PermissionNode[]; // Permissions are passed down from the server
}
const PermissionProvider = ({ children, permissions }: PermissionProviderProps) => {
    const findPermissionByPath = useMemo(() => (path: string): PermissionNode | null => {
        const findRecursive = (): PermissionNode | null => {
            
            const pathSegments = path.split("/").filter(Boolean).filter(e => !locales.includes(e as EnabledLocale));
            // sort menu longest first, root "/" last
            const sortedMenus = permissions.sort((a, b) => (b.url?.length ?? 0) - (a.url?.length ?? 0));
            const menu = sortedMenus.find((m) => {
                if (m.url === "/") return path === "/"; // root only
                const menuSegments = m.url?.split("/").filter(Boolean) ?? [];
                return menuSegments.every((seg, i) => seg === pathSegments[i]);
            });
            if (!menu) return null;

            return menu;
        };
        return findRecursive();
    }, [permissions]);

    const can = useMemo(() => (action: PermissionAction, path: string): boolean => {

        const permission = findPermissionByPath(path);
        if (!permission) {
            return false;
        }
        switch (action) {
            case 'view': return permission.canView;
            case 'create': return permission.canCreate;
            case 'update': return permission.canUpdate;
            case 'delete': return permission.canDelete;
            default: return false;
        }
    }, [findPermissionByPath]);
    return (
        <PermissionContext.Provider value={{ permissions, findPermissionByPath, can }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error("usePermissions must be used within a PermissionProvider");
    }
    return context;
};

export default PermissionProvider;