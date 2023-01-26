import { createContext, useState } from 'react';

import { GAME_BOARD } from '~/constants';
import { useGameContext } from '~/hooks/useGameContext';

import { Board } from './Board';
import { Container } from './styled';
import { Teams } from './Teams';
import { IGameBoardContext, TPlayerPosition, TPlayerPositions } from './types';

export const GameBoardContext = createContext<IGameBoardContext | null>(null);

export function GameBoard() {
  const { teams, activeTeamId } = useGameContext();

  const teamsArr = Object.values(teams);

  const getInitialPlayerPositions = () => {
    return teamsArr.reduce((acc, player, index) => {
      acc[player.id] = {
        step: 1,
        row: 0,
        cell: 0,
        place: index + 1,
        siblings: teamsArr.length - 1,
      };

      return acc;
    }, {} as TPlayerPositions);
  };

  const [isPlayerMoving, setIsPlayerMoving] = useState(false);
  const [playerPositions, setPlayerPositions] = useState<TPlayerPositions>(getInitialPlayerPositions());

  const getPlayerPosition = (id: string): TPlayerPosition => {
    return playerPositions[id];
  };

  const getPlayersOnStep = (step: number) => {
    return Object.entries(playerPositions).filter((entry) => entry[1].step === step).length;
  };

  const getPositionFromStep = (step: number): TPlayerPosition => {
    const row = GAME_BOARD.find((r) => r.includes(step));
    const cell = row?.indexOf(step);

    const position = {
      row: row ? GAME_BOARD.indexOf(row) : 1,
      cell: cell !== undefined ? cell : 1,
    };

    const siblings = getPlayersOnStep(step);

    return {
      ...position,
      step,
      place: siblings + 1,
      siblings,
    };
  };

  const delay = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const movePlayerOneStep = async (step: number) => {
    const { place: movingPlace, step: startingStep } = playerPositions[activeTeamId];
    const nextPosition = getPositionFromStep(step);

    const getOtherPlayerPlace = (pos: TPlayerPosition) => {
      if (pos.step === step) {
        return pos.place;
      }

      if (pos.step === startingStep && step - startingStep === 1 && movingPlace < pos.place) {
        return pos.place - 1;
      }

      return pos.place;
    };

    const getOtherPlayerSiblings = (pos: TPlayerPosition) => {
      if (pos.step === step) {
        return pos.siblings + 1;
      }

      if (pos.step === startingStep) {
        return getPlayersOnStep(pos.step) - 2;
      }

      return getPlayersOnStep(pos.step) - 1;
    };

    setPlayerPositions((prev) => {
      const otherPlayerPositions = Object.entries(prev)
        .filter(([id]) => id !== activeTeamId)
        .sort((a, b) => a[1].place - b[1].place)
        .reduce((acc, [id, pos]) => {
          const place = getOtherPlayerPlace(pos);
          const siblings = getOtherPlayerSiblings(pos);

          acc[id] = { ...pos, place, siblings };

          return acc;
        }, {} as TPlayerPositions);

      return {
        ...prev,
        ...otherPlayerPositions,
        [activeTeamId]: nextPosition,
      };
    });

    await delay(250);
  };

  const movePlayerToStep = async (finalStep: number) => {
    const { step } = playerPositions[activeTeamId];
    const steps = finalStep - step;

    if (steps === 0) {
      return;
    }

    if (steps > 0) {
      for (let i = 1; i <= steps; i++) {
        await movePlayerOneStep(step + i);
      }
    } else {
      for (let i = 1; i <= -steps; i++) {
        await movePlayerOneStep(step - i);
      }
    }
  };

  const movePlayer = async (step: number) => {
    if (isPlayerMoving) {
      return;
    }

    setIsPlayerMoving(true);

    await movePlayerToStep(step);

    setIsPlayerMoving(false);
  };

  const value: IGameBoardContext = {
    board: GAME_BOARD,
    players: teamsArr,
    getPlayerPosition,
    isPlayerMoving,
    movePlayer,
  };

  return (
    <GameBoardContext.Provider value={value}>
      <Container>
        <Teams />
        <Board />
      </Container>
    </GameBoardContext.Provider>
  );
}
