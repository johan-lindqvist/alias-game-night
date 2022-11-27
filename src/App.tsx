import { CssBaseline, ThemeProvider } from '@mui/material';
import { GameProvider } from 'components/GameProvider';
import { SetupDialog } from 'components/SetupDialog';
import { theme } from 'theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <SetupDialog>
          <div className="App">
            <header className="App-header">
              <h1>Alias</h1>
            </header>
          </div>
        </SetupDialog>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
