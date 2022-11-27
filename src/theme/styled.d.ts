import 'styled-components';
import { Theme } from '@mui/material';
import { customTheme } from './theme';

type TCustomTheme = typeof customTheme;

declare module '@mui/material/styles' {
  interface Theme extends TCustomTheme {}
  interface ThemeOptions extends TCustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
