import './App.css';
import { GameProvider } from './components/GameProvider';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <header className="App-header">
          <h1>Alias</h1>
        </header>
      </div>
    </GameProvider>
  );
}

export default App;
