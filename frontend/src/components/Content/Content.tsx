import { GameBoardProvider } from '~/components/GameBoardProvider';
import { GameProvider } from '~/components/GameProvider';
import { GameView } from '~/components/GameView';
import { SetupDialog } from '~/components/SetupDialog';
import { ESetupState } from '~/components/SetupProvider/types';
import { useSetupContext } from '~/hooks/useSetupContext';

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
      <GameBoardProvider>
        <GameView />
      </GameBoardProvider>
    </GameProvider>
  );
}
