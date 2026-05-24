"use client";

import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/localStorage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(readStorage(key, initialValue));
  }, [initialValue, key]);

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
