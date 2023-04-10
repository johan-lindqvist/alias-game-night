import { createContext, useMemo, useState } from 'react';

import { useSetupContext } from '~/hooks/useSetupContext';
import { EDictionaryTypes } from '~/types';

import { IGameContext, IGameProviderProps, TTeamsState, TWordsState } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export function GameProvider({ children, options }: IGameProviderProps) {
  const getInitialTeamsState = (): TTeamsState => {
    return Object.values(options.teams).reduce<TTeamsState>((acc, team, index) => {
      const isActive = index === 0;
      const activePlayerIndex = isActive ? 0 : -1;
      const teamId = team.id;
      const score = 0;

      acc[teamId] = { score, teamId, isActive, activePlayerIndex };

      return acc;
    }, {});
  };

  const getInitialWordsState = (): TWordsState => {
    return {
      active: '',
      type: EDictionaryTypes.Easy,
      remaining: options.dictionary.words,
      played: {
        [EDictionaryTypes.Easy]: [],
        [EDictionaryTypes.Medium]: [],
        [EDictionaryTypes.Hard]: [],
        [EDictionaryTypes.Extreme]: [],
      },
    };
  };

  const [teamsState, setTeamsState] = useState<TTeamsState>(getInitialTeamsState());
  const [wordsState, setWordsState] = useState<TWordsState>(getInitialWordsState());

  const { initializeSetup } = useSetupContext();

  const quitGame = () => initializeSetup();

  const activeTeam = useMemo(() => {
    return Object.values(teamsState).find(({ isActive }) => isActive)!;
  }, [teamsState]);

  const activeTeamId = useMemo(() => activeTeam.teamId, [activeTeam.teamId]);

  const activePlayerId = useMemo(() => {
    return options.teams[activeTeam.teamId].players[activeTeam.activePlayerIndex].id;
  }, [activeTeam, options.teams]);

  const nextTeam = () => {
    const teams = Object.values(teamsState);
    const nextIndex = teams.indexOf(activeTeam) + 1;
    const nextActiveTeam = nextIndex > teams.length - 1 ? teams[0] : teams[nextIndex];
    const nextActivePlayerIndex =
      (nextActiveTeam.activePlayerIndex + 1) % options.teams[nextActiveTeam.teamId].players.length;

    setTeamsState((prevTeamsState) => ({
      ...prevTeamsState,
      [activeTeamId]: {
        ...prevTeamsState[activeTeamId],
        isActive: false,
      },
      [nextActiveTeam.teamId]: {
        ...prevTeamsState[nextActiveTeam.teamId],
        isActive: true,
        activePlayerIndex: nextActivePlayerIndex,
      },
    }));
  };

  const nextWord = () => {
    const { type, remaining, played } = wordsState;

    const words = remaining[type];
    const index = Math.floor(Math.random() * words.length);
    const active = words[index];

    const newRemaining = words.filter((word) => word !== active);
    const newPlayed = [...played[type], active];

    setWordsState((prevWordsState) => ({
      ...prevWordsState,
      active,
      played: {
        ...prevWordsState.played,
        [type]: newPlayed,
      },
      remaining: {
        ...prevWordsState.remaining,
        [type]: newRemaining,
      },
    }));
  };

  const correctGuess = () => {
    nextWord();

    const newScore = activeTeam.score + 1;

    setTeamsState((prevTeamsState) => ({
      ...prevTeamsState,
      [activeTeamId]: {
        ...prevTeamsState[activeTeamId],
        score: newScore,
      },
    }));
  };

  const setTeamScore = (id: string, score: number) => {
    setTeamsState((prevTeamsState) => ({
      ...prevTeamsState,
      [id]: {
        ...prevTeamsState[id],
        score,
      },
    }));
  };

  const value: IGameContext = {
    ...options,
    activeWord: wordsState.active,
    activeTeam,
    activeTeamId,
    activePlayerId,
    quitGame,
    nextTeam,
    nextWord,
    correctGuess,
    setTeamScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
