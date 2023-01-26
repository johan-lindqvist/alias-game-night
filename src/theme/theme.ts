import { createTheme } from '@mui/material';

export const customTheme = { custom: { teamsCard: { width: 260, borderRadius: 24 } } };

export const theme = createTheme({ ...customTheme, palette: { mode: 'dark' } });
