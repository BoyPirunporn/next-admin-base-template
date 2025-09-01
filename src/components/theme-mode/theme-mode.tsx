'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeMode = () => {
    const { theme: currentTheme, setTheme, systemTheme } = useTheme();
    const theme = currentTheme === "system" ? systemTheme : currentTheme;
    const [x, setX] = useState(theme === "dark" ? 32 : 3);
    const [icon, setIcon] = useState(theme as string);
    const [pendingTheme, setPendingTheme] = useState<string | null>(null);

    const handMode = () => {
        // กำหนด theme ที่จะเปลี่ยนไว้ แต่ยังไม่เปลี่ยนทันที
        const nextTheme = theme === "dark" ? "light" : "dark";
        setPendingTheme(nextTheme);
        setX(nextTheme === "dark" ? 32 : 3);
    };

    useEffect(() => {
        setX(theme === "dark" ? 32 : 3);
        setIcon(theme as string);
    }, [theme]);

    return (
        <div >
            <button
                onClick={handMode}
                className={cn(
                    "pointer-events-auto relative w-14 h-7 rounded-xl shadow-inner bg-gray-200 flex items-center p-1 transition-all duration-300 ease-in-out cursor-pointer hover:border-amber-300 border",
                    theme === "dark" && "bg-muted"
                )}
            >
                <motion.div
                    animate={{ x }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                        // เมื่อ animation เสร็จแล้วค่อย setTheme จริง ๆ
                        if (pendingTheme) {
                            setTheme(pendingTheme);
                            setPendingTheme(null);
                        }
                    }}
                    className="absolute w-4 h-4 left-0 z-[1]"
                >
                    {icon === "dark" ? (
                        <Moon className="w-4 h-4 text-white" />
                    ) : (
                        <Sun className="w-4 h-4 text-black" />
                    )}
                </motion.div>
            </button>
        </div>
    );
};

export default ThemeMode;
