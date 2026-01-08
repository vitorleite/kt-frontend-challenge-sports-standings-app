import { useCallback, useState } from 'react';

export function useLocalStoragePersistence<T>(key: string) {
  const [state, setState] = useState<T | undefined>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : undefined;
  });

  const handleChange = useCallback(
    (newState: T) => {
      setState(newState);
      localStorage.setItem(key, JSON.stringify(newState));
    },
    [key]
  );

  return { state, handleChange };
}
