import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  storage: Storage = window.localStorage
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
      // Notify other tabs
      window.dispatchEvent(new StorageEvent("storage", { key }));
    } catch (error: unknown) {
      /* Ignore quota errors */
      console.error("Error setting item", error);
    }
  }, [key, value, storage]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const item = storage.getItem(key);
          if (item) setValue(JSON.parse(item) as T);
        } catch (error: unknown) {
          /* Ignore errors */
          console.error("Error parsing item", error);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, storage]);

  return [value, setValue];
}
