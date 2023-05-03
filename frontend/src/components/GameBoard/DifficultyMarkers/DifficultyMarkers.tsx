import { useGameContext } from '~/hooks/useGameContext';

import { Marker, MarkersContainer } from './styled';

export function DifficultyMarkers() {
  const { settings } = useGameContext();

  const markers = [
    {
      label: 'Easy',
      rounds: settings.easyRounds,
    },
    {
      label: 'Medium',
      rounds: settings.mediumRounds,
    },
    {
      label: 'Hard',
      rounds: settings.hardRounds,
    },
    {
      label: 'Extreme',
      rounds: settings.extremeRounds,
    },
  ];

  return (
    <MarkersContainer>
      {markers.map(
        ({ label, rounds }) =>
          rounds > 0 && (
            <Marker key={label} $rounds={rounds}>
              {label}
            </Marker>
          ),
      )}
    </MarkersContainer>
  );
}
