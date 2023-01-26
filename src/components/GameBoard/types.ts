export type TBoardRow = [number, number, number, number, number, number, number, number];

export type TBoard = TBoardRow[];

export type TPlayer = {
  id: string;
  name: string;
  color: string;
};

export type TPlayerPosition = {
  step: number;
  row: number;
  cell: number;
  place: number;
  siblings: number;
};

export type TPlayerPositions = Record<string, TPlayerPosition>;

export interface IGameBoardContext {
  board: TBoard;
  players: TPlayer[];
  isPlayerMoving: boolean;
  getPlayerPosition: (id: string) => TPlayerPosition;
  movePlayer: (step: number) => void;
}
