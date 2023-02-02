import { useRef, useEffect } from 'react';

// 记录旧值的公用hooks
export default function usePrevious<T>(value: any) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}