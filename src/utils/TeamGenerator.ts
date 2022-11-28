import { v4 } from "uuid";
import { TEAM_COLORS, TEAM_NAMES } from "consts";
import { IGameTeam } from "types";

export class TeamGenerator {
  static names: string[] = TEAM_NAMES;
  static takenNames: string[] = [];

  static colors: string[] = TEAM_COLORS;
  static takenColors: string[] = [];

  static generateTeam(): IGameTeam {
    const availableNames = this.names.filter((name) => !this.takenNames.includes(name));
    const name = availableNames[Math.floor(Math.random() * availableNames.length)];

    const availableColors = this.colors.filter((name) => !this.takenColors.includes(name));
    const color = availableColors[Math.floor(Math.random() * availableColors.length)];

    this.takenNames.push(name);
    this.takenColors.push(color);

    return {
      id: v4(),
      name: name,
      color: color,
      players: [],
    };
  }

  static releaseTeam(team: IGameTeam): void {
    this.takenNames = this.takenNames.filter((name) => name !== team.name);
    this.takenColors = this.takenColors.filter((color) => color !== team.color);
  }
}
