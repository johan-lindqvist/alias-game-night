import { useGameContext } from '~/hooks/useGameContext';

export function WordActions() {
  const { activeWord, nextWord, correctGuess } = useGameContext();

  const showWord = () => {
    window.alert(activeWord);
  };

  return (
    <div>
      <button type="button" onClick={correctGuess}>
        Correct
      </button>
      <button type="button" onClick={nextWord}>
        Skip
      </button>
      <button type="button" onClick={showWord}>
        Show
      </button>
    </div>
  );
}
