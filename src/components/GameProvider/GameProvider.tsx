import { createContext, useMemo, useState } from 'react';

import { useSetupContext } from '~/hooks/useSetupContext';

import { IGameContext, IGameProviderProps, IGameState } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export function GameProvider({ children, options }: IGameProviderProps) {
  const getInitialGameState = (): IGameState => {
    const teams = Object.values(options.teams).reduce<IGameState['teams']>((acc, team, index) => {
      const isActive = index === 0;
      const activePlayerIndex = isActive ? 0 : -1;
      const teamId = team.id;

      acc[teamId] = { teamId, isActive, activePlayerIndex };

      return acc;
    }, {});

    return { teams };
  };

  const [gameState, setGameState] = useState<IGameState>(getInitialGameState());
  const { initializeSetup } = useSetupContext();

  const quitGame = () => {
    initializeSetup();
  };

  const activeTeam = useMemo(() => {
    return Object.values(gameState.teams).find(({ isActive }) => isActive)!;
  }, [gameState.teams]);

  const activeTeamId = useMemo(() => activeTeam.teamId, [activeTeam.teamId]);

  const activePlayerId = useMemo(() => {
    return options.teams[activeTeam.teamId].players[activeTeam.activePlayerIndex].id;
  }, [activeTeam, options.teams]);

  const nextTeam = () => {
    const teams = Object.values(gameState.teams);
    const nextIndex = teams.indexOf(activeTeam) + 1;
    const nextActiveTeam = nextIndex > teams.length - 1 ? teams[0] : teams[nextIndex];
    const nextActivePlayerIndex =
      (nextActiveTeam.activePlayerIndex + 1) % options.teams[nextActiveTeam.teamId].players.length;

    setGameState((prevGameState) => ({
      ...prevGameState,
      teams: {
        ...prevGameState.teams,
        [activeTeamId]: {
          ...prevGameState.teams[activeTeamId],
          isActive: false,
        },
        [nextActiveTeam.teamId]: {
          ...prevGameState.teams[nextActiveTeam.teamId],
          isActive: true,
          activePlayerIndex: nextActivePlayerIndex,
        },
      },
    }));
  };

  const value: IGameContext = {
    ...options,
    activeTeamId,
    activePlayerId,
    quitGame,
    nextTeam,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
