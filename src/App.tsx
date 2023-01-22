import { CssBaseline, ThemeProvider } from '@mui/material';

import { Content } from '~/components/Content';
import { SetupProvider } from '~/components/SetupProvider';
import { theme } from '~/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SetupProvider>
        <Content />
      </SetupProvider>
    </ThemeProvider>
  );
}
