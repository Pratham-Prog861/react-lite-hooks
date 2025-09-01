import { useCallback, useState } from "react";

/**
 * A simple boolean state manager.
 * @param initial - Initial boolean value (default: false)
 * @returns [state, toggle, setState]
 */
export function useToggle(initial: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState<boolean>(initial);
  const toggle = useCallback(() => setState(prev => !prev), []);
  return [state, toggle, setState];
}
