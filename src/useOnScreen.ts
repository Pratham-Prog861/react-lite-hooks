import { useState, useEffect, useRef, RefObject } from "react";

export function useOnScreen<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
}
