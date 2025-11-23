import { useEffect, useRef } from "react";

/**
 * A declarative hook for setting intervals.
 * Handles the "stale closure" problem automatically.
 *
 * @param callback - The function to call at each interval
 * @param delay - The delay in milliseconds (or null to stop the interval)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
