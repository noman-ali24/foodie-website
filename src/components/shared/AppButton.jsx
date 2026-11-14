import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const VARIANT_MAP = {
  primary: { muiVariant: 'contained', muiColor: 'primary', extraClass: '' },
  secondary: { muiVariant: 'contained', muiColor: 'secondary', extraClass: '' },
  outline: { muiVariant: 'outlined', muiColor: 'primary', extraClass: '' },
  ghost: {
    muiVariant: 'text',
    muiColor: 'inherit',
    extraClass: 'text-dark hover:bg-cream-strong/70 shadow-none',
  },
  dark: {
    muiVariant: 'contained',
    muiColor: 'inherit',
    extraClass: 'bg-dark text-white hover:bg-neutral-800 shadow-md',
  },
};

const SIZE_MAP = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

export default function AppButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) {
  const mappedVariant = VARIANT_MAP[variant] || VARIANT_MAP.primary;
  const mappedSize = SIZE_MAP[size] || 'medium';

  return (
    <Button
      type={type}
      variant={mappedVariant.muiVariant}
      color={mappedVariant.muiColor}
      size={mappedSize}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          startIcon
        )
      }
      endIcon={!loading ? endIcon : undefined}
      className={`${mappedVariant.extraClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Button>
  );
}

