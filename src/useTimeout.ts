import { useEffect, useRef } from "react";

/**
 * A declarative hook for setting timeouts.
 *
 * @param callback - The function to call after the delay
 * @param delay - The delay in milliseconds (or null to cancel)
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}
