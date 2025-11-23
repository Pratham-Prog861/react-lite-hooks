import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Tracks whether an element is being hovered.
 *
 * @returns A tuple containing the ref to attach to the element and the boolean hover state.
 */
export function useHover<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  return [ref, value];
}
