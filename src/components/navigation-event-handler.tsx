'use client';
import { usePathname } from '@/i18n/navigation';
import { useStoreBackdrop } from '@/stores/store-backdrop';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const NavigationEventHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hideBackdrop = useStoreBackdrop((state) => state.hide);

  // ใช้ useRef เพื่อเก็บ path ล่าสุด
  const previousPath = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    // เช็คว่า path ปัจจุบันไม่ตรงกับ path ก่อนหน้า
    if (previousPath.current !== currentPath) {
      hideBackdrop(); // ซ่อน Backdrop
      previousPath.current = currentPath; // อัปเดต path ล่าสุด
    }
  }, [pathname, searchParams, hideBackdrop]);

  return null; // Component นี้ไม่ต้องแสดงผลอะไร
}

export default NavigationEventHandler


