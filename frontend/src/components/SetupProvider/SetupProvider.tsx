import { createContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { LOCAL_STORAGE_KEY } from '~/constants';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useTeamGenerator } from '~/hooks/useTeamGenerator';
import { EDictionaryTypes } from '~/types';
import { getEmptyWords } from '~/utils';

import { INITIAL_SETTINGS } from './constants';
import { ESetupState, ISetupContext, ISetupProviderProps, ISetupState, TUpdateKey, TUpdateValue } from './types';

export const SetupContext = createContext<ISetupContext | null>(null);

export function SetupProvider({ children }: ISetupProviderProps) {
  const [setupState, setSetupState] = useState<ISetupState>({
    state: ESetupState.Setup,
    teams: {},
    settings: INITIAL_SETTINGS,
    dictionary: null,
    playedWords: getEmptyWords(),
  });

  const { set, get, getTeams } = useLocalStorage();
  const { generateTeam, removeTeam } = useTeamGenerator(getTeams());

  useEffect(() => {
    const data = get<ISetupState>(LOCAL_STORAGE_KEY);

    if (data) {
      setSetupState(data);
    }
  }, [get]);

  const updateSetupState = (key: TUpdateKey, value: TUpdateValue) => {
    const updatedState = { ...setupState, [key]: value };

    set(LOCAL_STORAGE_KEY, updatedState);
    setSetupState(updatedState);
  };

  const completeSetup = () => updateSetupState('state', ESetupState.Complete);

  const initializeSetup = () => updateSetupState('state', ESetupState.Setup);

  const resetPlayedWords = () => updateSetupState('playedWords', getEmptyWords());

  const addPlayedWord = (type: EDictionaryTypes, word: string) => {
    const newPlayedWords = _.cloneDeep(setupState.playedWords);

    newPlayedWords[type].push(word);

    updateSetupState('playedWords', newPlayedWords);
  };

  const value: ISetupContext = {
    ...setupState,
    updateSetupState,
    completeSetup,
    initializeSetup,
    addPlayedWord,
    resetPlayedWords,
    generateTeam,
    removeTeam,
  };

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>;
}
