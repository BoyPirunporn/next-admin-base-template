import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // cancel timer ถ้า value เปลี่ยนอีก
  }, [value, delay]);

  return debouncedValue;
}