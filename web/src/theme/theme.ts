import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00c2ff',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(14, 18, 30, 0.94)',
    },
  },
  shape: {
    borderRadius: 12,
  },
});
