import { useEffect } from 'react';

import { TKeybinds } from './types';

export function useKeybinds(keybinds: TKeybinds) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const callback = keybinds[event.code];

      if (callback) {
        event.stopPropagation();
        event.preventDefault();

        callback(event);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [keybinds]);
}
