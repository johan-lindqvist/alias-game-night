import './App.css';
import { GameProvider } from 'components/GameProvider';
import { SetupDialog } from 'components/SetupDialog';

function App() {
  return (
    <GameProvider>
      <SetupDialog>
        <div className="App">
          <header className="App-header">
            <h1>Alias</h1>
          </header>
        </div>
      </SetupDialog>
    </GameProvider>
  );
}

export default App;
