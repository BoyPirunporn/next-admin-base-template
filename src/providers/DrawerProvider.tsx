'use client';
import DrawerComponent from '@/components/drawer/drawer-component';
import { useEffect, useState } from 'react';


const DrawerProvider = () => {
    // const [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if (!isMounted) return null;
    return <DrawerComponent />
}

export default DrawerProvider