// @/hooks/useCustomRouter.ts

'use client';

import { useRouter as useNextIntlRouter, usePathname } from '@/i18n/navigation';
import { useStoreBackdrop } from '@/stores/store-backdrop';


export function useCustomRouter() {
  const router = useNextIntlRouter();
  const pathname = usePathname();
  const showBackdrop = useStoreBackdrop((state) => state.show);

  const push = (href: string, options?: any) => {
    if (href !== pathname) { // ป้องกันการ trigger ตอน push ไปหน้าเดิม
      showBackdrop();
    }
    router.push(href, options);
  };

  const replace = (href: string, options?: any) => {
     if (href !== pathname) {
      showBackdrop();
    }
    router.replace(href, options);
  };
  
  // สามารถเพิ่ม back, forward ได้ตามต้องการ
  return {
    ...router,
    push,
    replace,
  };
}