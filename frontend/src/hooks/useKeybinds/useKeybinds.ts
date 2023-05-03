import { useEffect } from 'react';

import { Keybinds } from '~/constants';

import { TKeybinds } from './types';

export function useKeybinds(keybinds: TKeybinds) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key as Keybinds;
      const callback = keybinds[key];

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
