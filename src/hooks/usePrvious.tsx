import { useRef, useEffect } from 'react';

// 记录旧值的公用hooks
export default function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}