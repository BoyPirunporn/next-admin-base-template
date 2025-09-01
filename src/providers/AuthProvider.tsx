'use client';
import React, { useEffect } from 'react';

import { useStoreUser } from '@/stores/store-user';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({
    children,
    session
}: Readonly<{
    session: Session | null;
    children: React.ReactNode;
}>) => {
    const { user, setUser } = useStoreUser();

    // // การทำแบบนี้ยังคงมีประโยชน์เพื่อให้เข้าถึง session จากที่อื่นที่ไม่ใช่ component ได้
    useEffect(() => {
        if (session && !user) {
            setUser(session);
        }
    }, []);
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default AuthProvider;