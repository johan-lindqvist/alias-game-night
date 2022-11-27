import { CssBaseline, ThemeProvider } from '@mui/material';
import { GameProvider } from 'components/GameProvider';
import { SetupDialog } from 'components/SetupDialog';
import { GameView } from 'components/GameView';
import { theme } from 'theme';

function App() {
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

export default App;
