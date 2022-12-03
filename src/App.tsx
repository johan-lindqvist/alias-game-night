import { CssBaseline, ThemeProvider } from '@mui/material';

import { GameProvider } from '~/components/GameProvider';
import { GameView } from '~/components/GameView';
import { SetupDialog } from '~/components/SetupDialog';
import { theme } from '~/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <SetupDialog>
          <GameView />
        </SetupDialog>
      </GameProvider>
    </ThemeProvider>
  );
}
