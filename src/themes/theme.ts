import { PaletteMode } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { PaletteColorOptions, createTheme } from "@mui/material/styles";
import { ColorPartial, CommonColors, PaletteTonalOffset, TypeAction, TypeBackground, TypeText } from "@mui/material/styles/createPalette";
 
export const appTheme = createTheme({
components: {
    MuiButton: {
        defaultProps: {
            variant: 'contained',
            size: 'small'
          },
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderRadius: 1,
            },
          },
    },
    MuiStack: {
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderRadius: 1,
            //   backgroundColor: '#c3baaa'
            },
          },
    },
    MuiGrid: {
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderRadius: 1,
            //   backgroundColor: '#c3baaa'
            },
          },
    },
    },
  palette: {
    primary: blue,
    secondary: blue,
    // background: {
    //     default: '#c3baaa'
    // } 
  },
});

interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    mode?: PaletteMode;
    tonalOffset?: PaletteTonalOffset;
    contrastThreshold?: number;
    common?: Partial<CommonColors>;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    divider?: string;
    action?: Partial<TypeAction>;
    background?: Partial<TypeBackground>;
    getContrastText?: (background: string) => string;
  }

  interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }