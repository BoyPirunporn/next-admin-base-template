import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { SetStateAction } from 'react';

const ToggleComponent = ({
    active,
    setActive
}: Readonly<{
    active: boolean;
    setActive: React.Dispatch<SetStateAction<boolean>>;
}>) => {
    return (
        <div
            className={cn(
                "toggle-container md:block hidden",
                active && " toggle-active"
            )}
        >
            <div className="toggle-bg"
                style={{ transform: active ? 'translateX(50%)' : 'translateX(0)' }}
            >
                <div className="toggle-content"
                    style={{ transform: active ? 'translateX(0)' : 'translateX(-200%)' }}
                >
                    <h1>Admin Login</h1>
                    <p >Sign in to manage your store, view reports, and access admin features</p>
                    <Button onClick={() => setActive(false)} variant={"outline"} className='mt-3'>Sign In</Button>
                </div>

                <div className="toggle-content"
                    style={{ transform: active ? 'translateX(200%)' : 'translateX(0)' }}
                >
                    <h1>Welcome!</h1>
                    <p>Join us to enjoy exclusive deals and access all features in our store</p>
                    <Button onClick={() => setActive(true)} variant={"outline"} className='mt-3'>Sign Up</Button>
                </div>
            </div>
        </div>
    );
};

export default ToggleComponent;