import { EnabledLocale, locales } from '@/i18n/routing';
import { authOptions } from '@/lib/auth/auth';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { PermissionNode } from 'next-auth/jwt';
import { notFound } from 'next/navigation';
import React from 'react';
export type PermissionAction = 'view' | 'create' | 'update' | 'delete';

interface PermissionGuardProps {
    children: React.ReactNode;
    path: string; // The base path of the resource (e.g., /users)
    action: PermissionAction; // The specific action to check
} 

// Helper function to find permission node by path
const findPermissionByPath = (path: string, permissions: PermissionNode[]): PermissionNode | null => {
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
const PermissionGuard = async ({ children, path, action }: PermissionGuardProps) => {
    const session = await getServerSession(authOptions);
    const permissions = session?.permissions || [];
    const permission = findPermissionByPath(path,permissions);
    let hasPermission = false;
    if (permission) {
        switch (action) {
            case 'view': hasPermission = permission.canView; break;
            case 'create': hasPermission = permission.canCreate; break;
            case 'update': hasPermission = permission.canUpdate; break;
            case 'delete': hasPermission = permission.canDelete; break;
        }
    }
    logger.info({ canAccess: hasPermission, path, action });

    // If the user does not have the required permission, show a 404 page.
    if (!hasPermission) {
        notFound();
    }

    // If they have permission, render the page content.
    return <>{children}</>;
};

export default PermissionGuard;