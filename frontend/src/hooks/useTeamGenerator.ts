import { useRef, useState } from 'react';
import { v4 } from 'uuid';

import { TEAM_COLORS, TEAM_NAMES } from '~/constants';
import { IGameTeam, TGameTeams } from '~/types';

export const useTeamGenerator = (initialTeams: TGameTeams) => {
  const extractNames = (teams: TGameTeams): string[] => Object.values(teams).map((team) => team.name);
  const extractColors = (teams: TGameTeams): string[] => Object.values(teams).map((team) => team.color);

  const names = useRef(TEAM_NAMES);
  const colors = useRef(TEAM_COLORS);

  const [takenNames, setTakenNames] = useState<string[]>(extractNames(initialTeams));
  const [takenColors, setTakenColors] = useState<string[]>(extractColors(initialTeams));

  const generateTeam = (): IGameTeam => {
    const availableNames = names.current.filter((name) => !takenNames.includes(name));
    const name = availableNames[Math.floor(Math.random() * availableNames.length)];

    const availableColors = colors.current.filter((color) => !takenColors.includes(color));
    const color = availableColors[Math.floor(Math.random() * availableColors.length)];

    setTakenNames([...takenNames, name]);
    setTakenColors([...takenColors, color]);

    return {
      id: v4(),
      name,
      color,
      players: [],
    };
  };

  const removeTeam = (team: IGameTeam) => {
    setTakenNames(takenNames.filter((name) => name !== team.name));
    setTakenColors(takenColors.filter((color) => color !== team.color));
  };

  return { generateTeam, removeTeam };
};
