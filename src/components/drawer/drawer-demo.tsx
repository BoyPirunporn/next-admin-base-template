"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { SizeDrawer } from "@/stores/store-drawer";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerDirectionProps,
    DrawerHeader,
    DrawerTitle
} from "../ui/drawer";

interface DrawerProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    size?: SizeDrawer;
    className?: string;
    children?: React.ReactNode;
    onInteractOutside?: boolean;
    showCloseButton?: boolean;
    direction?: DrawerDirectionProps;
}

const sizeClass = {
    sm: "data-[vaul-drawer-direction=right]:md:w-1/4",
    md: "data-[vaul-drawer-direction=right]:md:w-2/6",
    lg: "data-[vaul-drawer-direction=right]:md:w-3/6",
    xl: "data-[vaul-drawer-direction=right]:md:w-4/6"
};

const animationClass = {
  bottom: "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  top: "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
  left: "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
  right: "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
};
export function DrawerDemo({
    title,
    description = "",
    isOpen,
    onClose,
    size = "md",
    children,
    className,
    onInteractOutside = false,
    direction = "right"
}: DrawerProps) {
    return (
        <Drawer open={isOpen} onClose={onClose} direction={direction}>
            <DrawerContent
                onInteractOutside={e => {
                    if (!onInteractOutside) {
                        e.preventDefault();
                    }
                }}
                className={cn(
                    sizeClass[size],
                    className,
                    "overflow-y-auto overflow-x-hidden",
                    "transition-all duration-300", // ✅ เพิ่ม
                    "data-[state=open]:animate-in data-[state=closed]:animate-out", // ✅ เพิ่ม
                    animationClass[direction]
                )}
            >
                <DrawerHeader className="w-[calc(100%_-_2rem)]">
                    <DrawerTitle>
                        {title}
                    </DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="px-5 h-full pb-5">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
