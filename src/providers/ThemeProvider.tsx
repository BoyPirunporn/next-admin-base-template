'use client';
import { applyTheme, useThemeStore } from '@/stores/store-theme';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect, useState } from 'react';
const ThemeProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const color = useThemeStore((s) => s.color);

    // apply on mount & on change
    useEffect(() => { applyTheme({ color }); }, [color]);

    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "system");
        }
    }, []);
    useEffect(() => {
        setMount(true);
    }, []);
    if (!mount) return null;



    return (
        <NextThemesProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
            storageKey='theme'
            enableColorScheme
        >
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;