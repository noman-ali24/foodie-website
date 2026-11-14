import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';

export default function AppDialog({
  open = false,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      slotProps={{
        paper: {
          className: 'rounded-3xl p-2 sm:p-4 border border-border-warm',
        },
      }}
    >
      {(title || onClose) && (
        <DialogTitle className="flex items-start justify-between gap-4 pb-2">
          <div>
            {title && (
              <h3 className="text-xl font-bold text-dark leading-snug">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-body font-normal mt-1">{subtitle}</p>
            )}
          </div>
          {onClose && (
            <IconButton
              onClick={onClose}
              aria-label="Close dialog"
              size="small"
              className="text-body hover:text-dark hover:bg-cream"
            >
              <X className="w-5 h-5" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent className="py-3">{children}</DialogContent>

      {actions && (
        <DialogActions className="px-6 pb-4 pt-2 gap-2">
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

