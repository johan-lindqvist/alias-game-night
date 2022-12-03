import { useCallback } from 'react';

export const useLocalStorage = () => {
  const get = useCallback(<T>(key: string): T | null => {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }, []);

  const set = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  return { get, set };
};
