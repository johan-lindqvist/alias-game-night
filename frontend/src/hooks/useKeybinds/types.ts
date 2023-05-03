import { Keybinds } from '~/constants';

type TKeybindKey = Keybinds;
type TKeybindCallback = (event: KeyboardEvent) => void;

export type TKeybinds = Partial<Record<TKeybindKey, TKeybindCallback>>;
