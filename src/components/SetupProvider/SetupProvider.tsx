import { createContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { LOCAL_STORAGE_KEY } from '~/constants';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { EDictionaryTypes } from '~/types';

import { INITIAL_PLAYED_WORDS, INITIAL_SETTINGS, INITIAL_TEAMS } from './constants';
import { ESetupState, ISetupContext, ISetupProviderProps, ISetupState, TUpdateKey, TUpdateValue } from './types';

export const SetupContext = createContext<ISetupContext | null>(null);

export function SetupProvider({ children }: ISetupProviderProps) {
  const [setupState, setSetupState] = useState<ISetupState>({
    state: ESetupState.Setup,
    teams: INITIAL_TEAMS,
    settings: INITIAL_SETTINGS,
    dictionary: null,
    playedWords: INITIAL_PLAYED_WORDS,
  });

  const { get, set } = useLocalStorage();

  useEffect(() => {
    const data = get<ISetupContext>(LOCAL_STORAGE_KEY);

    if (data) {
      setSetupState(data);
    }
  }, [get]);

  const updateSetupState = (key: TUpdateKey, value: TUpdateValue) => {
    const updatedState = { ...setupState, [key]: value };

    set(LOCAL_STORAGE_KEY, updatedState);
    setSetupState(updatedState);
  };

  const completeSetup = () => {
    const updatedState = { ...setupState, state: ESetupState.Complete };

    set(LOCAL_STORAGE_KEY, updatedState);
    setSetupState(updatedState);
  };

  const initializeSetup = () => {
    const updatedState = { ...setupState, state: ESetupState.Setup };

    set(LOCAL_STORAGE_KEY, updatedState);
    setSetupState(updatedState);
  };

  const resetPlayedWords = () => {
    updateSetupState('playedWords', INITIAL_PLAYED_WORDS);
  };

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
  };

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>;
}
