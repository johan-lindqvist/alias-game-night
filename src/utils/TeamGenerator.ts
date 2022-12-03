import { v4 } from 'uuid';

import { TEAM_COLORS, TEAM_NAMES } from '~/constants';
import { IGameTeam } from '~/types';

export class TeamGenerator {
  static names: string[] = TEAM_NAMES;

  static takenNames: string[] = [];

  static colors: string[] = TEAM_COLORS;

  static takenColors: string[] = [];

  static generateTeam(): IGameTeam {
    const availableNames = this.names.filter((name) => !this.takenNames.includes(name));
    const name = availableNames[Math.floor(Math.random() * availableNames.length)];

    const availableColors = this.colors.filter((color) => !this.takenColors.includes(color));
    const color = availableColors[Math.floor(Math.random() * availableColors.length)];

    this.takenNames.push(name);
    this.takenColors.push(color);

    return {
      id: v4(),
      name,
      color,
      players: [],
    };
  }

  static releaseTeam(team: IGameTeam): void {
    this.takenNames = this.takenNames.filter((name) => name !== team.name);
    this.takenColors = this.takenColors.filter((color) => color !== team.color);
  }
}
