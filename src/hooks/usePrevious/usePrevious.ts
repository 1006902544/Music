import { useRef, useEffect } from 'react';

export default function usePrevious(initValue: unknown, value: unknown) {
  const ref = useRef<unknown>(initValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}