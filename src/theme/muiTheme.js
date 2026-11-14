import { createTheme } from '@mui/material/styles';

export const DESIGN_TOKENS = {
  colors: {
    primary: '#FFB800',
    primaryLight: '#FFD04D',
    primaryDark: '#E09F00',
    secondary: '#FF7A00',
    secondaryLight: '#FF9838',
    secondaryDark: '#E06800',
    textDark: '#222222',
    textBody: '#666666',
    textMuted: '#8C8C8C',
    bgWhite: '#FFFFFF',
    bgLight: '#FFF9ED',
    bgSoftAccent: '#FFF3D6',
    borderLight: '#F2EADF',
    success: '#16A34A',
    error: '#DC2626',
    warning: '#F59E0B',
    info: '#2563EB',
  },
  fonts: {
    heading: "'Poppins', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  radii: {
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '24px',
    pill: '9999px',
  },
  shadows: {
    card: '0 10px 30px -5px rgba(34, 34, 34, 0.06)',
    cardHover: '0 20px 40px -10px rgba(255, 122, 0, 0.16)',
    floating: '0 16px 36px -4px rgba(34, 34, 34, 0.10)',
    buttonPrimary: '0 8px 20px -4px rgba(255, 184, 0, 0.45)',
    buttonSecondary: '0 8px 20px -4px rgba(255, 122, 0, 0.38)',
  },
};

const muiTheme = createTheme({
  spacing: 8,
  palette: {
    mode: 'light',
    primary: {
      main: DESIGN_TOKENS.colors.primary,
      light: DESIGN_TOKENS.colors.primaryLight,
      dark: DESIGN_TOKENS.colors.primaryDark,
      contrastText: DESIGN_TOKENS.colors.textDark,
    },
    secondary: {
      main: DESIGN_TOKENS.colors.secondary,
      light: DESIGN_TOKENS.colors.secondaryLight,
      dark: DESIGN_TOKENS.colors.secondaryDark,
      contrastText: '#FFFFFF',
    },
    text: {
      primary: DESIGN_TOKENS.colors.textDark,
      secondary: DESIGN_TOKENS.colors.textBody,
      disabled: DESIGN_TOKENS.colors.textMuted,
    },
    background: {
      default: DESIGN_TOKENS.colors.bgWhite,
      paper: DESIGN_TOKENS.colors.bgWhite,
    },
    divider: DESIGN_TOKENS.colors.borderLight,
    success: {
      main: DESIGN_TOKENS.colors.success,
    },
    error: {
      main: DESIGN_TOKENS.colors.error,
    },
    warning: {
      main: DESIGN_TOKENS.colors.warning,
    },
    info: {
      main: DESIGN_TOKENS.colors.info,
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: DESIGN_TOKENS.fonts.body,
    h1: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 700,
      fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: DESIGN_TOKENS.colors.textDark,
    },
    h2: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
      color: DESIGN_TOKENS.colors.textDark,
    },
    h3: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 600,
      fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
      lineHeight: 1.3,
      color: DESIGN_TOKENS.colors.textDark,
    },
    h4: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
      color: DESIGN_TOKENS.colors.textDark,
    },
    h5: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      color: DESIGN_TOKENS.colors.textDark,
    },
    h6: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.45,
      color: DESIGN_TOKENS.colors.textDark,
    },
    subtitle1: {
      fontFamily: DESIGN_TOKENS.fonts.body,
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: DESIGN_TOKENS.colors.textDark,
    },
    subtitle2: {
      fontFamily: DESIGN_TOKENS.fonts.body,
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: DESIGN_TOKENS.colors.textBody,
    },
    body1: {
      fontFamily: DESIGN_TOKENS.fonts.body,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.65,
      color: DESIGN_TOKENS.colors.textBody,
    },
    body2: {
      fontFamily: DESIGN_TOKENS.fonts.body,
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: DESIGN_TOKENS.colors.textBody,
    },
    button: {
      fontFamily: DESIGN_TOKENS.fonts.heading,
      fontWeight: 600,
      fontSize: '0.9375rem',
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: DESIGN_TOKENS.fonts.body,
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: DESIGN_TOKENS.colors.textMuted,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.radii.pill,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '13px 30px',
          fontSize: '1rem',
        },
        containedPrimary: {
          backgroundColor: DESIGN_TOKENS.colors.primary,
          color: DESIGN_TOKENS.colors.textDark,
          boxShadow: DESIGN_TOKENS.shadows.buttonPrimary,
          '&:hover': {
            backgroundColor: DESIGN_TOKENS.colors.primaryDark,
            boxShadow: DESIGN_TOKENS.shadows.buttonPrimary,
            transform: 'translateY(-1px)',
          },
        },
        containedSecondary: {
          backgroundColor: DESIGN_TOKENS.colors.secondary,
          color: '#FFFFFF',
          boxShadow: DESIGN_TOKENS.shadows.buttonSecondary,
          '&:hover': {
            backgroundColor: DESIGN_TOKENS.colors.secondaryDark,
            boxShadow: DESIGN_TOKENS.shadows.buttonSecondary,
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: DESIGN_TOKENS.colors.borderLight,
          color: DESIGN_TOKENS.colors.textDark,
          '&:hover': {
            borderWidth: '1.5px',
            borderColor: DESIGN_TOKENS.colors.primary,
            backgroundColor: DESIGN_TOKENS.colors.bgLight,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.radii.md,
          backgroundColor: DESIGN_TOKENS.colors.bgWhite,
          fontFamily: DESIGN_TOKENS.fonts.body,
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: DESIGN_TOKENS.colors.borderLight,
            borderWidth: '1.5px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: DESIGN_TOKENS.colors.primary,
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 4px rgba(255, 184, 0, 0.15)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: DESIGN_TOKENS.colors.secondary,
            borderWidth: '1.5px',
          },
        },
        input: {
          padding: '13px 16px',
          color: DESIGN_TOKENS.colors.textDark,
          '&::placeholder': {
            color: DESIGN_TOKENS.colors.textMuted,
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: DESIGN_TOKENS.fonts.body,
          fontWeight: 500,
          color: DESIGN_TOKENS.colors.textBody,
          '&.Mui-focused': {
            color: DESIGN_TOKENS.colors.secondaryDark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.radii.xl,
          boxShadow: DESIGN_TOKENS.shadows.card,
          border: `1px solid ${DESIGN_TOKENS.colors.borderLight}`,
          backgroundColor: DESIGN_TOKENS.colors.bgWhite,
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: DESIGN_TOKENS.radii.xl,
          boxShadow: DESIGN_TOKENS.shadows.floating,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: DESIGN_TOKENS.radii.pill,
          fontFamily: DESIGN_TOKENS.fonts.heading,
          fontWeight: 600,
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#EFECE6',
          '&::after': {
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent)',
          },
        },
        rounded: {
          borderRadius: DESIGN_TOKENS.radii.md,
        },
      },
    },
  },
});

export default muiTheme;

