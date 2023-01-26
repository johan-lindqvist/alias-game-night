import { useGameContext } from '~/hooks/useGameContext';

import { TeamsContainer } from './styled';
import { Team } from './Team';

export function Teams() {
  const { teams } = useGameContext();

  return (
    <TeamsContainer>
      {Object.values(teams).map((team) => (
        <Team key={team.id} team={team} />
      ))}
    </TeamsContainer>
  );
}
