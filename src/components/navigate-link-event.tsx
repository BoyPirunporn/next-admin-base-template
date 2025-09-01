// @/components/CustomLink.tsx

'use client';

import { Link } from '@/i18n/navigation';
import { useStoreBackdrop } from '@/stores/store-backdrop';
import React from 'react';

type NavigateLinkEventProps = {
    href:string;
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigateLinkEvent = React.forwardRef<HTMLAnchorElement, NavigateLinkEventProps>(
    ({ onClick, ...props }, ref) => {
        const showBackdrop = useStoreBackdrop((state) => state.show);

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            showBackdrop(); // แสดง Backdrop ก่อนเสมอ
            if (onClick) {
                onClick(e);
            }
        };

        return <Link {...props} ref={ref} onClick={handleClick} />;
    }
);

NavigateLinkEvent.displayName = 'NavigateLinkEvent';
export default NavigateLinkEvent;