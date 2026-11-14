import { NavLink, Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {
  X,
  UtensilsCrossed,
  ShoppingBag,
  LogIn,
  UserPlus,
  ChevronRight,
} from 'lucide-react';
import AppButton from '../shared/AppButton.jsx';
import { useCartStore } from '../../store/useCartStore.js';
import { selectTotalUnits } from '../../store/cartSelectors.js';

export default function MobileNavDrawer({
  open = false,
  onClose,
  navLinks = [],
  cartCount,
}) {
  const storeCartUnits = useCartStore(selectTotalUnits);
  const resolvedCartCount =
    typeof cartCount === 'number' ? cartCount : storeCartUnits;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className:
            'w-full max-w-xs bg-surface p-6 flex flex-col justify-between border-l border-border-warm',
        },
      }}
    >
      <div className="space-y-6">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-warm">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-dark shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="font-heading text-xl font-extrabold text-dark tracking-tight">
              Fast<span className="text-secondary">Food</span>
            </span>
          </Link>

          <IconButton
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-dark hover:bg-cream"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Mobile navigation" className="space-y-1.5">
          {navLinks.map((item) => {
            const isHashLink = item.path.includes('#');

            if (isHashLink) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl font-heading font-semibold text-sm text-dark hover:bg-cream hover:text-secondary transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted" />
                </a>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl font-heading font-semibold text-sm transition-colors ${
                    isActive
                      ? 'bg-cream-strong text-secondary'
                      : 'text-dark hover:bg-cream hover:text-secondary'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-muted" />
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Cart Link */}
        <div className="pt-2 border-t border-border-warm">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-cream hover:bg-cream-strong transition-colors"
          >
            <div className="flex items-center gap-3">
              <Badge
                badgeContent={resolvedCartCount}
                color="secondary"
                invisible={resolvedCartCount === 0}
              >
                <ShoppingBag className="w-5 h-5 text-dark" />
              </Badge>
              <span className="font-heading font-semibold text-sm text-dark">
                Shopping Cart
              </span>
            </div>
            <span className="text-xs font-bold text-secondary">
              {resolvedCartCount > 0
                ? `${resolvedCartCount} ${resolvedCartCount === 1 ? 'item' : 'items'}`
                : 'View Cart'}
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Auth Actions */}
      <div className="pt-6 border-t border-border-warm space-y-3">
        <AppButton
          component={Link}
          to="/login"
          onClick={onClose}
          variant="outline"
          fullWidth
          startIcon={<LogIn className="w-4 h-4" />}
        >
          Log In
        </AppButton>
        <AppButton
          component={Link}
          to="/signup"
          onClick={onClose}
          variant="primary"
          fullWidth
          startIcon={<UserPlus className="w-4 h-4" />}
        >
          Sign Up
        </AppButton>
      </div>
    </Drawer>
  );
}
