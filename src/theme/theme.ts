import { createTheme } from '@mui/material';

export const customTheme = {
  custom: {
    teamsCard: {
      width: 300
    }
  }
};

export const theme = createTheme({ ...customTheme });
