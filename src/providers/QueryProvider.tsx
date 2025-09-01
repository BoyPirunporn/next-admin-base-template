'use client'; // ถ้าใช้ react-query ใน layout client component ต้องมี

import { useCustomRouter } from '@/components/custom-router';
import { Button } from '@/components/ui/button';
import useStoreModal from '@/stores/store-model';
import { QueryCache, QueryClient, QueryClientProvider as QueryTanstackProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export default function QueryClientProvider({ children }: { children: React.ReactNode; }) {
  const t = useTranslations();
  const router = useCustomRouter();
  const modal = useStoreModal();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1
      }
    },
    queryCache: new QueryCache({
      onError(error, query) {
        console.log(query);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            signOut({ redirect: false });
            modal.openModal({
              title: t("error.unauthorize"),
              content: (
                <div className='flex flex-col gap-5'>
                  {t("error.sessionTimeout")}
                  <Button className='ml-auto' onClick={() => {
                    modal.closeAllModals();
                    router.push("/auth");
                  }}>{t("common.btnOk")}</Button>
                </div>
              ),
              onInteractOutside: false,
              showCloseButton: false,
            });

            setTimeout(() => {
              modal.closeAllModals();
              router.push("/auth");
            }, 15 * 1000);
          }
        }
      },
    })
  }));
  return (
    <QueryTanstackProvider client={queryClient}>
      {children}
    </QueryTanstackProvider>
  );
}
