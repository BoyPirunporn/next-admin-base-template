import LanguageSwitcher from '@/components/luanges-switcher';
import ThemeColor from '@/components/theme-color';
import ThemeMode from '@/components/theme-mode/theme-mode';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import React from 'react';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb-component';
import { AppSidebar } from '../../../components/sidebar/app-sidebar';

const RootLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className='peer-data-[state=expanded]:max-w-[calc(100%_-_var(--sidebar-width))]'>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <BreadcrumbComponent />
                    <div className="ml-auto md:block hidden">
                        <div className="flex flex-row gap-2 items-center">
                            <ThemeMode />
                            <ThemeColor />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </header>
                <div className='relative min-h-[calc(100vh-4rem)]'>
                    {children}
                </div>
            </SidebarInset>

        </SidebarProvider>
    );
};

export default RootLayout;