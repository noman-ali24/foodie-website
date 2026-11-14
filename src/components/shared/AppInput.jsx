import { useId } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function AppInput({
  id,
  label,
  ariaLabel,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error = '',
  helperText = '',
  startIcon,
  endIcon,
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
  size = 'medium',
  className = '',
  slotProps,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const hasError = Boolean(error);

  return (
    <div className={`w-full ${className}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-dark mb-1.5"
        >
          {label}
          {required && <span className="text-secondary ml-0.5">*</span>}
        </label>
      )}
      <TextField
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={hasError}
        helperText={hasError ? error : helperText}
        required={required}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        size={size}
        fullWidth
        slotProps={{
          ...slotProps,
          htmlInput: {
            ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
            ...slotProps?.htmlInput,
          },
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start" className="text-muted">
                {startIcon}
              </InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end" className="text-muted">
                {endIcon}
              </InputAdornment>
            ) : undefined,
            ...slotProps?.input,
          },
        }}
        {...rest}
      />
    </div>
  );
}

