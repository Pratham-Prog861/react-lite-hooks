import { useEffect, useRef, useState } from "react";

/**
 * Limits how often a rapidly changing value can update.
 * Useful for scroll, resize, and mousemove driven state.
 *
 * @param value - The value to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns The throttled value
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecutedRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (delay <= 0) {
      setThrottledValue(value);
      return;
    }

    const now = Date.now();
    const remaining = delay - (now - lastExecutedRef.current);

    if (remaining <= 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      lastExecutedRef.current = now;
      setThrottledValue(value);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      lastExecutedRef.current = Date.now();
      setThrottledValue(value);
      timeoutRef.current = null;
    }, remaining);
  }, [value, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledValue;
}
