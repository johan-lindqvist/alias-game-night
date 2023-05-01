import { useGameContext } from '~/hooks/useGameContext';

import { NoWord, Word } from './styled';

export function ActiveWord() {
  const { activeWord } = useGameContext();

  if (!activeWord) {
    return <NoWord>N/A</NoWord>;
  }

  return <Word>{activeWord}</Word>;
}
