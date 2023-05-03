type TKeybindKey = string;
type TKeybindCallback = (event: KeyboardEvent) => void;

export type TKeybinds = Record<TKeybindKey, TKeybindCallback>;
