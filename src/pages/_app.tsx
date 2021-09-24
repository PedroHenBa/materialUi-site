import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';
import { theme } from '../styles/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderMui theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProviderMui>
    </ThemeProvider>
  );
}
export default MyApp;
