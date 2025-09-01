"use client";
import Backdrop from '@/components/backdrop';
import { useStoreBackdrop } from '@/stores/store-backdrop';

const BackdropProvider = () => {
    const { isVisible } = useStoreBackdrop();
    if(!isVisible) return null;
    return (
        <Backdrop />
    );
};

export default BackdropProvider;