import { NavLink, Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {
  UtensilsCrossed,
  Search,
  ShoppingBag,
  Menu,
  LogIn,
} from 'lucide-react';
import PageContainer from './PageContainer.jsx';
import MobileNavDrawer from './MobileNavDrawer.jsx';
import AppButton from '../shared/AppButton.jsx';
import { useCartStore } from '../../store/useCartStore.js';
import { selectTotalUnits } from '../../store/cartSelectors.js';
import { useUIStore } from '../../store/useUIStore.js';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Services', path: '/#services' },
  { label: 'Testimonials', path: '/#testimonials' },
  { label: 'Get App', path: '/#download-app' },
];

export default function Navbar({ cartCount, onCartClick, onSearchClick }) {
  const storeCartUnits = useCartStore(selectTotalUnits);
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const openMobileNav = useUIStore((state) => state.openMobileNav);
  const closeMobileNav = useUIStore((state) => state.closeMobileNav);

  const navigate = useNavigate();

  const resolvedCartCount =
    typeof cartCount === 'number' ? cartCount : storeCartUnits;

  const handleSearchTrigger = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      navigate('/menu');
    }
  };

  const handleCartTrigger = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      navigate('/cart');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border-warm transition-all">
      <PageContainer className="h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-dark shadow-[var(--shadow-btn-primary)] group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <span className="font-heading text-2xl font-extrabold text-dark tracking-tight">
            Fast<span className="text-secondary">Food</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {NAV_LINKS.map((item) => {
            const isHashLink = item.path.includes('#');

            if (isHashLink) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  className="px-4 py-2 rounded-full font-heading font-semibold text-sm text-body hover:text-dark hover:bg-cream transition-colors"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-heading font-semibold text-sm transition-colors ${
                    isActive
                      ? 'bg-cream-strong text-secondary'
                      : 'text-body hover:text-dark hover:bg-cream'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <IconButton
            onClick={handleSearchTrigger}
            aria-label="Search food menu"
            className="w-10 h-10 rounded-full bg-cream text-dark hover:bg-cream-strong transition-colors"
          >
            <Search className="w-5 h-5" />
          </IconButton>

          {/* Cart Trigger with Live Item Count Badge */}
          <IconButton
            onClick={handleCartTrigger}
            aria-label={`Shopping cart with ${resolvedCartCount} items`}
            className="w-10 h-10 rounded-full bg-cream text-dark hover:bg-cream-strong transition-colors"
          >
            <Badge
              badgeContent={resolvedCartCount}
              color="secondary"
              invisible={resolvedCartCount === 0}
              overlap="circular"
            >
              <ShoppingBag className="w-5 h-5" />
            </Badge>
          </IconButton>

          {/* Desktop Login CTA */}
          <div className="hidden sm:block">
            <AppButton
              component={Link}
              to="/login"
              variant="primary"
              size="sm"
              startIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In
            </AppButton>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <IconButton
              onClick={openMobileNav}
              aria-label="Open navigation menu"
              className="w-10 h-10 rounded-full bg-cream text-dark hover:bg-cream-strong"
            >
              <Menu className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      </PageContainer>

      {/* Responsive Mobile Navigation Drawer */}
      <MobileNavDrawer
        open={isMobileNavOpen}
        onClose={closeMobileNav}
        navLinks={NAV_LINKS}
        cartCount={resolvedCartCount}
      />
    </header>
  );
}
