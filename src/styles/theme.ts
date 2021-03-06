import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

export const theme = createTheme({
  palette: {
    action: {
      hover: 'rgba(0,0,0,0.09)',
    },
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: '#ffffff',
    },
  },
});
