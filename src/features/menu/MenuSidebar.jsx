import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';
import MenuFilters from './MenuFilters.jsx';
import AppButton from '../../components/shared/AppButton.jsx';

export default function MenuSidebar({
  mobileOpen = false,
  onMobileClose,
  totalMatching = 0,
  ...filterProps
}) {
  return (
    <>
      {/* Desktop Permanent Left Sidebar */}
      <aside
        aria-label="Menu filters"
        className="hidden lg:block w-72 xl:w-80 shrink-0"
      >
        <Card className="sticky top-24 rounded-3xl bg-surface border border-border-warm p-6">
          <MenuFilters {...filterProps} />
        </Card>
      </aside>

      {/* Mobile & Tablet Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        slotProps={{
          paper: {
            className:
              'w-full max-w-xs bg-surface p-6 flex flex-col justify-between border-r border-border-warm',
          },
        }}
      >
        <div className="overflow-y-auto pr-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <span className="font-heading text-lg font-extrabold text-dark">
              Refine Menu
            </span>
            <IconButton
              onClick={onMobileClose}
              aria-label="Close filters drawer"
              size="small"
              className="text-dark hover:bg-cream"
            >
              <X className="w-5 h-5" />
            </IconButton>
          </div>

          <MenuFilters {...filterProps} />
        </div>

        <div className="pt-4 mt-4 border-t border-border-warm">
          <AppButton
            variant="primary"
            fullWidth
            onClick={onMobileClose}
          >
            Show {totalMatching} {totalMatching === 1 ? 'Dish' : 'Dishes'}
          </AppButton>
        </div>
      </Drawer>
    </>
  );
}

