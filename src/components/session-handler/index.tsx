
'use client';

import { useEffect } from 'react';
// Assuming you use next-intl for translations
import { useActivityLog } from '@/hooks/use-activity-log';
import { usePathname } from '@/i18n/navigation';
import report from '@/lib/report';
import { useStoreBackdrop } from '@/stores/store-backdrop';
import { useStoreMenu } from '@/stores/store-menu';
import useStoreModal from '@/stores/store-model';
import { useStoreUser } from '@/stores/store-user';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useCustomRouter } from '../custom-router';
import { Button } from '../ui/button';

interface SessionErrorHandlerProps {
    sessionError?: string | null;
}

// Define public paths where the modal should NOT appear
const PUBLIC_PATHS = ['/auth', '/email-not-verified', '/auth/verify-email'];

export default function SessionErrorHandler({ sessionError }: SessionErrorHandlerProps) {
    const { openModal } = useStoreModal();
    const router = useCustomRouter()
    const pathname = usePathname();
    const {log} = useActivityLog()
    const t = useTranslations(); // Namespace for error messages

    // Check if the current page is a public page
    const isPublicPage = PUBLIC_PATHS.some(path => pathname.includes(path));

     const clearSession = React.useCallback(() => {
        useStoreMenu.getState().clear();
        useStoreUser.getState().clearUser();
    }, []);

    // helper: handle expired token
    const handleTokenExpired = React.useCallback(async () => {
        try {
            // await handleClearSession();
            await signOut({ redirect: false });
            clearSession();
            log("SIGNOUT", "TOKEN:EXPIRED");
            useStoreModal.getState().openModal({
                title: t("error.unauthorize"),
                showCloseButton: false,
                onInteractOutside: false,
                content: (
                    <div className="flex flex-col gap-3">
                        <p>{t("error.sessionTimeout")}</p>
                        <Button className="ml-auto" onClick={() => {
                            useStoreModal.getState().closeAllModals();
                            router.replace(`/auth`);
                        }}>
                            {t("common.btnOk")}
                        </Button>
                    </div>
                ),
            });

            setTimeout(() => {
                useStoreModal.getState().closeAllModals();
                useStoreBackdrop.getState().hide();
                router.replace(`/auth`);
            }, 15 * 1000);
        } catch (error) {
            report(error);
            return;
        }
    }, [clearSession, log, sessionError]);

    useEffect(() => {
        // We only care about the specific refresh token error
        const shouldShowModal = sessionError === 'RefreshAccessTokenError';

        // Trigger the modal only if there's an error and we are not on a public page
        if (shouldShowModal && !isPublicPage) {
            handleTokenExpired()
        }
    }, [sessionError, isPublicPage]); // Effect dependencies

    return null; // This component doesn't render anything
}