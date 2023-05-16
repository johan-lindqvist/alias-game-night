import { createContext, useMemo, useState } from 'react';
import _ from 'lodash';

import { ISetupState } from '~/components/SetupProvider/types';
import { LOCAL_STORAGE_KEY } from '~/constants';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useSetupContext } from '~/hooks/useSetupContext';
import { EDictionaryTypes, IWords } from '~/types';
import { getEmptyWords } from '~/utils';

import { IGameContext, IGameProviderProps, TTeamsState, TWordsState } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export function GameProvider({ children, options }: IGameProviderProps) {
  const { get } = useLocalStorage();

  const getInitialTeamsState = (): TTeamsState => {
    return Object.values(options.teams).reduce<TTeamsState>((acc, team, index) => {
      const isActive = index === 0;
      const isFinished = false;
      const activePlayerIndex = isActive ? 0 : -1;
      const teamId = team.id;
      const score = 0;

      acc[teamId] = { score, teamId, isActive, isFinished, activePlayerIndex };

      return acc;
    }, {});
  };

  const getInitialWordsState = (): TWordsState => {
    const { playedWords } = get<ISetupState>(LOCAL_STORAGE_KEY) || {};
    const { dictionary } = options;

    const remainingWords = Object.entries(dictionary.words).reduce<IWords>((acc, [type, words]) => {
      const wordsType = type as EDictionaryTypes;

      const playedWordsForType = playedWords ? playedWords[wordsType] : [];
      const diff = _.difference(words, playedWordsForType);

      acc[wordsType] = diff;

      return acc;
    }, getEmptyWords());

    return {
      active: '',
      remaining: remainingWords,
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

  const { initializeSetup, addPlayedWord } = useSetupContext();

  const quitGame = () => initializeSetup();

  const activeTeam = useMemo(() => {
    return Object.values(teamsState).find(({ isActive }) => isActive)!;
  }, [teamsState]);

  const activeTeamId = useMemo(() => activeTeam.teamId, [activeTeam.teamId]);

  const activePlayerId = useMemo(() => {
    return options.teams[activeTeam.teamId].players[activeTeam.activePlayerIndex].id;
  }, [activeTeam, options.teams]);

  const getTeamScore = (teamId: string) => teamsState[teamId].score;

  const getTeamDictionaryDifficulty = (teamId: string, newScore?: number) => {
    const score = newScore || getTeamScore(teamId);

    let limit = options.settings.easyRounds;
    if (score < limit) {
      return EDictionaryTypes.Easy;
    }

    limit = options.settings.easyRounds + options.settings.mediumRounds;
    if (score < limit) {
      return EDictionaryTypes.Medium;
    }

    limit = options.settings.easyRounds + options.settings.mediumRounds + options.settings.hardRounds;
    if (score < limit) {
      return EDictionaryTypes.Hard;
    }

    return EDictionaryTypes.Extreme;
  };

  const nextTeam = (index?: number) => {
    const teams = Object.values(teamsState);
    const isAllTeamsFinished = teams.every((team) => team.isFinished);

    if (isAllTeamsFinished) {
      return;
    }

    const nextIndex = index || teams.indexOf(activeTeam) + 1;
    const nextActiveTeam = nextIndex > teams.length - 1 ? teams[0] : teams[nextIndex];

    if (nextActiveTeam.isFinished) {
      nextTeam(teams.indexOf(nextActiveTeam) + 1);
      return;
    }

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

  const nextWord = (score?: number) => {
    const { remaining, played } = wordsState;
    const difficulty = getTeamDictionaryDifficulty(activeTeamId, score);

    const words = remaining[difficulty];
    const index = Math.floor(Math.random() * words.length);
    const nextActive = words[index];

    addPlayedWord(difficulty, nextActive);

    const newRemaining = words.filter((word) => word !== nextActive);
    const newPlayed = [...played[difficulty], nextActive];

    setWordsState((prevWordsState) => ({
      ...prevWordsState,
      active: nextActive,
      played: {
        ...prevWordsState.played,
        [difficulty]: newPlayed,
      },
      remaining: {
        ...prevWordsState.remaining,
        [difficulty]: newRemaining,
      },
    }));
  };

  const isTeamFinished = (currentScore: number) => {
    const { settings } = options;
    const { easyRounds, mediumRounds, hardRounds, extremeRounds } = settings;

    const maxScore = easyRounds + mediumRounds + hardRounds + extremeRounds;

    return currentScore >= maxScore;
  };

  const correctGuess = () => {
    const newScore = activeTeam.score + 1;

    const finished = isTeamFinished(newScore);

    if (!finished) {
      nextWord(newScore);
    }

    setTeamsState((prevTeamsState) => ({
      ...prevTeamsState,
      [activeTeamId]: {
        ...prevTeamsState[activeTeamId],
        isFinished: finished,
        score: newScore,
      },
    }));
  };

  const setTeamScore = (id: string, score: number) => {
    const isFinished = isTeamFinished(score);

    setTeamsState((prevTeamsState) => ({
      ...prevTeamsState,
      [id]: {
        ...prevTeamsState[id],
        isFinished,
        score,
      },
    }));
  };

  const restartGame = () => {
    setTeamsState(getInitialTeamsState());
    setWordsState(getInitialWordsState());
  };

  const value: IGameContext = {
    ...options,
    gameContextTeams: Object.values(teamsState),
    activeWord: wordsState.active,
    activeTeam,
    activeTeamId,
    activePlayerId,
    quitGame,
    nextTeam,
    nextWord,
    restartGame,
    correctGuess,
    setTeamScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
