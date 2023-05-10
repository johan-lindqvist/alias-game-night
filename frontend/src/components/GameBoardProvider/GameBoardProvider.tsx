import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { useGameContext } from '~/hooks/useGameContext';

import { IGameBoardContext, IGameBoardProviderProps, TTeamPositions } from './types';

export const GameBoardContext = createContext<IGameBoardContext | null>(null);

export function GameBoardProvider({ children }: IGameBoardProviderProps) {
  const { settings, gameContextTeams: teams, activeTeamId, setTeamScore } = useGameContext();

  const getInitialTeamPositions = (): TTeamPositions => {
    return Object.values(teams).reduce<TTeamPositions>((acc, team) => {
      acc[team.teamId] = 0;

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

  const moveTeamsToTheirPositions = useCallback(() => {
    const newTeamPositions = Object.values(teams).reduce<TTeamPositions>((acc, team) => {
      acc[team.teamId] = team.score;

      return acc;
    }, {});

    setTeamPositions(newTeamPositions);
  }, [teams]);

  useEffect(() => {
    moveTeamsToTheirPositions();
  }, [teams, moveTeamsToTheirPositions]);

  const value: IGameBoardContext = {
    rowCells,
    teamPositions,
    moveTeamToPosition,
  };

  return <GameBoardContext.Provider value={value}>{children}</GameBoardContext.Provider>;
}
