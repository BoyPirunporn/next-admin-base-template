import { cn } from '@/lib/utils';
import React from 'react';

type Props = {};

const ToggleMobileComponent = ({
    animateToggle
}: Readonly<{
    animateToggle: string;
}>) => {
    return (
        <div
            className={cn(
                "toggle-container-mobile block md:hidden",
                animateToggle
            )}
        >
            <div className="toggle-bg-mobile">
                {/* TODO:: icons */}
            </div>
        </div>
    );
};

export default ToggleMobileComponent;