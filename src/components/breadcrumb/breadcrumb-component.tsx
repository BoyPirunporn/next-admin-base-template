'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { EnabledLocale, locales } from '@/i18n/routing';
import { MapLocalMenu, MenuLabelKey } from '@/lib/menu-utils';
import { MenuPermissionNode } from '@/model';
import { useStoreMenu } from '@/stores/store-menu';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


export const BreadcrumbComponent = () => {
    const { menus } = useStoreMenu();
    const pathname = usePathname();
    const locale = useLocale();
    const field: MenuLabelKey = MapLocalMenu[locale as EnabledLocale];

    function findMenuChainByUrl(
        menus: MenuPermissionNode[],
        pathname: string
    ): MenuPermissionNode[] {
        const pathSegments = pathname.split("/").filter(Boolean).filter(e => !locales.includes(e as EnabledLocale));
        const lastPathIndex = pathSegments[pathSegments.length - 1];
        for (const menu of menus) {
            if (menu.url === "/" && pathname === "/") {
                return [menu];
            }

            const menuSegments = menu.url?.split("/").filter(Boolean) ?? [];
            const isMatch = menuSegments.every((seg, i) => seg === pathSegments[i]);

            if (isMatch) {
                // ถ้าตรง และยังมี children -> ลองลงไปหา
                if (menu.children?.length) {
                    const childChain = findMenuChainByUrl(menu.children, pathname);
                    if (childChain.length) {
                        return [{ ...menu, url: menu.isGroup ? null as unknown as string : menu.url }, ...childChain];
                    }
                }
                // return lastPathIndex.toLowerCase() !== menu[field].toLowerCase()
                //     ? [
                //         menu,
                //         {
                //             ...menu,
                //             menuNameEN: lastPathIndex.substring(0, 1).toUpperCase() + lastPathIndex.substring(1).toLowerCase(),
                //             menuNameTH: lastPathIndex.substring(0, 1).toUpperCase() + lastPathIndex.substring(1).toLowerCase(),
                //             url: null as unknown as string
                //         }
                //     ]
                //     : 
                //     [menu];
                return [menu]
            }
        }

        return [];
    }

    const crumbs = React.useMemo(() => {
        return findMenuChainByUrl(menus ?? [], pathname);
    }, [pathname, menus]);

    if (crumbs.length === 0) return null;
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    return (
                        <div className="flex items-center space-x-2" key={crumb.url + crumb[field] + crumb.menuId}>
                            <BreadcrumbItem>
                                {index < crumbs.length - 1 && crumb.url ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${locale}` + crumb.url}>{crumb[field]}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{crumb[field]}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
