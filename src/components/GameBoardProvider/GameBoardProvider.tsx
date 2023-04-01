import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { useGameContext } from '~/hooks/useGameContext';

import { IGameBoardContext, IGameBoardProviderProps, TTeamPositions } from './types';

export const GameBoardContext = createContext<IGameBoardContext | null>(null);

export function GameBoardProvider({ children }: IGameBoardProviderProps) {
  const { settings, teams, activeTeamId, activeTeam, setTeamScore } = useGameContext();

  const getInitialTeamPositions = (): TTeamPositions => {
    return Object.values(teams).reduce<TTeamPositions>((acc, team) => {
      acc[team.id] = 0;

      return acc;
    }, {});
  };

  const [teamPositions, setTeamPositions] = useState<TTeamPositions>(getInitialTeamPositions);

  const rowCells = useMemo(() => {
    const { easyRounds, mediumRounds, hardRounds, extremeRounds } = settings;

    return easyRounds + mediumRounds + hardRounds + extremeRounds;
  }, [settings]);

  const moveTeamToPosition = useCallback(
    (position: number) => {
      setTeamScore(activeTeamId, position);
      setTeamPositions((prevTeamPositions) => ({
        ...prevTeamPositions,
        [activeTeamId]: position,
      }));
    },
    [activeTeamId, setTeamScore],
  );

  useEffect(() => {
    if (activeTeam.score !== teamPositions[activeTeamId]) {
      moveTeamToPosition(activeTeam.score);
    }
  }, [activeTeam, activeTeamId, moveTeamToPosition, teamPositions]);

  const value: IGameBoardContext = {
    rowCells,
    teamPositions,
    moveTeamToPosition,
  };

  return <GameBoardContext.Provider value={value}>{children}</GameBoardContext.Provider>;
}
