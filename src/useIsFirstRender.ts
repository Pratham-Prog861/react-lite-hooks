import { useRef } from "react";

/**
 * Returns true only on the first render of the component.
 * Useful for running effects only once or for analytics.
 *
 * @returns boolean
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
}
