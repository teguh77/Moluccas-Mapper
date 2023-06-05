import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, purple, lime } from '@mui/material/colors';

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: lime.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#232228',
      paper: '#171721',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

export default theme;
