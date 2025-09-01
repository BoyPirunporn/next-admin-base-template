'use client';
import { ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useMemo } from 'react';

// Assuming these are your component imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { EachElement } from '@/lib/utils';
import ThemeColor from '../theme-color';
import ThemeMode from '../theme-mode/theme-mode';
import RenderIcon, { IconName } from '../ui/render-icon';
import { Skeleton } from '../ui/skeleton';
import { NavUser } from './nav-user';

// Assuming these are your store/hook imports
import { Link } from '@/i18n/navigation';
import { EnabledLocale } from '@/i18n/routing';
import logger from '@/lib/logger';
import { MapLocalMenu, MenuLabelKey } from '@/lib/menu-utils';
import report from '@/lib/report';
import { MenuPermissionNode } from '@/model'; // Make sure this model is correctly defined
import { useStoreMenu } from '@/stores/store-menu';
import { useStoreUser } from '@/stores/store-user';
import NavigateLinkEvent from '../navigate-link-event';



// The buildMenu function remains largely the same, but it's now a pure rendering function.
const buildMenu = (menus: MenuPermissionNode[], pathname: string, locale: string, closeSideBar: () => void) => {
    const field: MenuLabelKey = MapLocalMenu[locale as EnabledLocale];

    // Sort menus by display order before mapping
    return menus.sort((a, b) => a.menuDisplayOrder - b.menuDisplayOrder).map(menu => {
        if (menu.children?.length && menu.isGroup) {
            return (
                <Collapsible
                    key={menu[field]}
                    defaultOpen
                    className="group/collapsible p-[calc(var(--spacing)_*_2)]"
                >
                    <CollapsibleTrigger className='flex flex-row items-center w-full cursor-pointer'>
                        {menu[field]}
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='mt-2 flex flex-col gap-2'>
                            {buildMenu(menu.children, pathname, locale, closeSideBar)}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            );
        } else {
            // Only render the menu item if it's marked as visible
            return menu.isVisible ? (
                <SidebarMenu key={menu[field]}>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(`/${locale}${menu.url}`)}>
                            <NavigateLinkEvent
                                href={`/${menu.url ?? ""}`}
                                className='w-full justify-start px-2'
                                onClick={() => {
                                    closeSideBar();
                                }}
                            >
                                {menu.icon && <RenderIcon name={menu.icon as IconName} />}
                                {menu[field]}
                            </NavigateLinkEvent>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            ) : null;
        }
    });
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user: session } = useStoreUser();
    const { menus, setMenus } = useStoreMenu();
    const pathname = usePathname();
    const locale = useLocale();
    const { isMobile, setOpenMobile } = useSidebar();
    logger.debug("callAsia", { menus, session });
    // Effect to fetch menus when the session is available
    useEffect(() => {
        if (session?.user && !menus) {
            (async () => {
                try {
                    const r = await fetch("/api/v1/menu/me");
                    if (!r.ok) throw new Error("Failed to load menu: " + await r.text());
                    const json = await r.json();
                    // logger.debug(json);
                    setMenus(json); // Store the fetched menus
                } catch (e) {
                    report(e);
                }
            })();
        }
    }, [session, menus, setMenus]);

    // Memoize the close function so it's not recreated on every render
    const closeSideBar = useCallback(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [isMobile, setOpenMobile]);

    // const handleChangeRoute = (route: string) => {
    //     startGlobalTransition(() => {
    //         router.push(route);
    //     });
    // };

    // Memoize the entire rendered menu tree.
    // It will only be recalculated if menus, pathname, locale, or the close function changes.
    const renderedMenu = useMemo(() => {
        if (!menus) {
            // Return skeleton loader while menus are being fetched
            return (
                <SidebarGroupContent className='flex flex-col gap-3'>
                    <EachElement
                        of={Array.from({ length: 10 })}
                        render={(_, index) => (
                            <SidebarMenu key={index}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Skeleton className='w-full h-10' />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        )}
                    />
                </SidebarGroupContent>
            );
        }
        // If menus are available, build the tree
        return (
            <SidebarGroupContent className='gap-2 flex flex-col'>
                {buildMenu(menus, pathname, locale, closeSideBar)}
            </SidebarGroupContent>
        );
    }, [menus, pathname, locale, closeSideBar]);

    return (
        <Sidebar {...props}>
            <SidebarHeader className='px-5'>
                <Link href={"/"} className="h-8 w-8 rounded-lg">
                    <Avatar>
                        <AvatarImage src={"/icon.png"} alt={"logo"} />
                        <AvatarFallback className="rounded-lg">Logo</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="md:hidden flex flex-row items-center justify-between border-dashed border border-primary p-4 gap-4">
                    <ThemeMode />
                    <ThemeColor />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {renderedMenu}
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}