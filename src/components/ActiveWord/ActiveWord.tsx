import { useGameContext } from '~/hooks/useGameContext';

import { Word } from './styled';

export function ActiveWord() {
  const { activeWord } = useGameContext();

  return <Word>{activeWord}</Word>;
}
