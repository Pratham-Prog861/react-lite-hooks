import { RefObject, useEffect, useRef, useState } from "react";

interface ElementSize {
  width: number;
  height: number;
}

/**
 * Observes element size changes using the ResizeObserver API.
 * Useful for responsive cards, charts, and container-based layouts.
 *
 * @returns A tuple containing a target ref and current element size
 */
export function useResizeObserver<T extends HTMLElement>(): [
  RefObject<T | null>,
  ElementSize,
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = ref.current;
    if (!node) return;

    const updateSize = () => {
      const { width, height } = node.getBoundingClientRect();
      setSize({ width, height });
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
