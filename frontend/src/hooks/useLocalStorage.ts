import { useCallback } from 'react';

import { ISetupState } from '~/components/SetupProvider/types';
import { LOCAL_STORAGE_KEY } from '~/constants';

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

  const getTeams = useCallback(() => {
    const data = get<ISetupState>(LOCAL_STORAGE_KEY);

    if (data) {
      return data.teams;
    }

    return {};
  }, [get]);

  return { set, get, getTeams };
};
