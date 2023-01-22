import { GameProvider } from '~/components/GameProvider';
import { useSetupContext } from '~/hooks/useSetupContext';

import { GameView } from '../GameView';
import { SetupDialog } from '../SetupDialog';
import { ESetupState } from '../SetupProvider/types';

export function Content() {
  const { state, teams, settings, dictionary } = useSetupContext();

  if (state === ESetupState.Setup) {
    return <SetupDialog />;
  }

  if (!dictionary) {
    throw new Error('Game dictionary not initialized correctly!');
  }

  return (
    <GameProvider options={{ teams, settings, dictionary }}>
      <GameView />
    </GameProvider>
  );
}
