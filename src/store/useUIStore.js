import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  notification: {
    open: false,
    message: '',
    severity: 'success',
  },

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () =>
    set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  showNotification: (message, severity = 'success') =>
    set({
      notification: {
        open: true,
        message: message || 'Item added to your cart.',
        severity,
      },
    }),

  hideNotification: () =>
    set((state) => ({
      notification: {
        ...state.notification,
        open: false,
      },
    })),
}));

export default useUIStore;

