import { theme } from '../styles/theme';
import { CSSProperties } from 'React';

type Theme = typeof theme;

declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface CommonColors {
    blue?: string;
    orange?: string;
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    tab?: {
      fontFamily?: string;
      textTransform?: CSSProperties.TextTransform;
      fontWeight?: number;
      fontSize?: string;
    };
  }

  interface Typography {
    tab: {
      fontFamily: string;
      textTransform: CSSProperties.TextTransform;
      fontWeight: number;
      fontSize: string;
    };
  }
}

declare module '@material-ui/styles/defaultTheme/index' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export {};
