import '@testing-library/jest-dom/vitest';
import { beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { useCartStore } from '../../src/store/useCartStore.js';
import { useUIStore } from '../../src/store/useUIStore.js';

// Mock window.scrollTo and Element.prototype.scrollIntoView for JSDOM
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}

beforeEach(() => {
  window.localStorage.clear();
  useCartStore.getState().clearCart();
  useUIStore.setState({
    isCartDrawerOpen: false,
    isMobileNavOpen: false,
    notification: {
      open: false,
      message: '',
      severity: 'success',
    },
  });
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

