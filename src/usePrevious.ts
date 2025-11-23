import { useRef, useEffect } from "react";

/**
 * Stores the previous value of a state or prop.
 * Useful for comparing changes or triggering animations.
 *
 * @param value - The value to track
 * @returns The previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
