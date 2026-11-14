import { describe, it, expect } from 'vitest';
import {
  useCartStore,
  sanitizeCartItems,
  CART_STORAGE_KEY,
  CART_STORE_VERSION,
} from '../../src/store/useCartStore.js';
import {
  DELIVERY_FEE_PKR,
  selectRawCartItems,
  selectResolvedCartItems,
  selectTotalUnits,
  selectDistinctLineCount,
  selectCartSubtotal,
  selectDeliveryFee,
  selectGrandTotal,
  selectCartSummary,
} from '../../src/store/cartSelectors.js';
import { useUIStore } from '../../src/store/useUIStore.js';
import { MENU_DATA } from '../../src/data/menuData.js';

describe('Unit: useCartStore & cartSelectors', () => {
  it('initializes with an empty cart and zeroed totals', () => {
    const state = useCartStore.getState();
    expect(selectTotalUnits(state)).toBe(0);
    expect(selectDistinctLineCount(state)).toBe(0);
    expect(selectCartSubtotal(state)).toBe(0);
    expect(selectDeliveryFee(state)).toBe(0);
    expect(selectGrandTotal(state)).toBe(0);
    expect(selectCartSummary(state).isEmpty).toBe(true);
  });

  it('maintains WeakMap reference stability across repeated calls and multiple snapshots', () => {
    const emptyState = useCartStore.getState();
    expect(selectCartSummary(emptyState)).toBe(selectCartSummary(emptyState));
    expect(selectResolvedCartItems(emptyState)).toBe(
      selectResolvedCartItems(emptyState)
    );

    useCartStore.getState().addItem('smoky-double-smash-burger', 2, '');
    const populatedStateA = useCartStore.getState();
    const mockStateB = {
      items: [
        {
          lineId: 'wood-fired-pepperoni-pizza::default',
          productId: 'wood-fired-pepperoni-pizza',
          quantity: 1,
          instructions: '',
        },
      ],
    };

    const resolvedA1 = selectResolvedCartItems(populatedStateA);
    const resolvedB1 = selectResolvedCartItems(mockStateB);
    const resolvedA2 = selectResolvedCartItems(populatedStateA);
    const resolvedB2 = selectResolvedCartItems(mockStateB);

    expect(resolvedA1).toBe(resolvedA2);
    expect(resolvedB1).toBe(resolvedB2);
    expect(resolvedA1).not.toBe(resolvedB1);

    const summaryA1 = selectCartSummary(populatedStateA);
    const summaryB1 = selectCartSummary(mockStateB);
    const summaryA2 = selectCartSummary(populatedStateA);
    const summaryB2 = selectCartSummary(mockStateB);

    expect(summaryA1).toBe(summaryA2);
    expect(summaryB1).toBe(summaryB2);
    expect(summaryA1).not.toBe(summaryB1);

    expect(selectRawCartItems(null)).toEqual([]);
    expect(selectCartSummary(null).isEmpty).toBe(true);
  });

  it('merges same product + matching normalized instructions and separates different instructions', () => {
    const burger = MENU_DATA.find((d) => d.id === 'smoky-double-smash-burger');

    useCartStore.getState().addItem(burger, 1, '');
    useCartStore.getState().addItem(burger.id, 2, '   ');
    expect(selectDistinctLineCount(useCartStore.getState())).toBe(1);
    expect(selectTotalUnits(useCartStore.getState())).toBe(3);

    useCartStore.getState().addItem(burger, 2, '  Extra   Spicy  ');
    useCartStore.getState().addItem(burger, 1, 'extra spicy');
    expect(selectDistinctLineCount(useCartStore.getState())).toBe(2);
    expect(selectTotalUnits(useCartStore.getState())).toBe(6);

    const summary = selectCartSummary(useCartStore.getState());
    expect(summary.subtotal).toBe(6 * 950);
    expect(summary.deliveryFee).toBe(DELIVERY_FEE_PKR);
    expect(summary.grandTotal).toBe(6 * 950 + DELIVERY_FEE_PKR);
  });

  it('enforces quantity bounds, line removal, and rejects invalid products or quantities', () => {
    const res = useCartStore
      .getState()
      .addItem('special-dum-chicken-biryani', 1, 'Extra raita');
    expect(res.ok).toBe(true);

    useCartStore.getState().increaseQuantity(res.lineId);
    expect(selectTotalUnits(useCartStore.getState())).toBe(2);

    useCartStore.getState().decreaseQuantity(res.lineId);
    useCartStore.getState().decreaseQuantity(res.lineId);
    expect(selectTotalUnits(useCartStore.getState())).toBe(1);

    expect(useCartStore.getState().updateQuantity(res.lineId, 4)).toBe(true);
    expect(selectTotalUnits(useCartStore.getState())).toBe(4);
    expect(useCartStore.getState().updateQuantity(res.lineId, 0)).toBe(false);
    expect(useCartStore.getState().updateQuantity(res.lineId, -3)).toBe(false);

    expect(useCartStore.getState().addItem('non-existent-id', 1).ok).toBe(
      false
    );
    expect(
      useCartStore.getState().addItem('special-dum-chicken-biryani', 0).ok
    ).toBe(false);

    useCartStore.getState().removeItem(res.lineId);
    expect(selectTotalUnits(useCartStore.getState())).toBe(0);
  });

  it('persists to localStorage and sanitizes corrupt or duplicate entries on hydration', async () => {
    useCartStore.getState().addItem('molten-chocolate-lava-cake', 2, '');
    const rawSaved = window.localStorage.getItem(CART_STORAGE_KEY);
    expect(rawSaved).toBeTruthy();
    const parsed = JSON.parse(rawSaved);
    expect(parsed.version).toBe(CART_STORE_VERSION);
    expect(parsed.state.items).toHaveLength(1);

    const dirtyInput = [
      null,
      'corrupt',
      { productId: 'deleted-dish-id', quantity: 5 },
      { productId: 'molten-chocolate-lava-cake', quantity: -2 },
      {
        productId: 'molten-chocolate-lava-cake',
        quantity: 2,
        instructions: 'Warm',
      },
      {
        productId: 'molten-chocolate-lava-cake',
        quantity: 3,
        instructions: '  warm  ',
      },
    ];
    const sanitized = sanitizeCartItems(dirtyInput);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0].quantity).toBe(5);
    expect(sanitized[0].lineId).toBe('molten-chocolate-lava-cake::warm');

    // Simulate reload rehydration from localStorage with mixed valid/corrupt data
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        state: { items: dirtyInput },
        version: CART_STORE_VERSION,
      })
    );
    await useCartStore.persist.rehydrate();
    expect(selectTotalUnits(useCartStore.getState())).toBe(5);
  });
});

describe('Unit: useUIStore', () => {
  it('manages notifications and mobile/cart drawer states cleanly', () => {
    useUIStore.getState().showNotification('Added Smash Burger', 'success');
    expect(useUIStore.getState().notification.open).toBe(true);
    expect(useUIStore.getState().notification.message).toBe(
      'Added Smash Burger'
    );

    useUIStore.getState().hideNotification();
    expect(useUIStore.getState().notification.open).toBe(false);

    useUIStore.getState().openMobileNav();
    expect(useUIStore.getState().isMobileNavOpen).toBe(true);
    useUIStore.getState().closeMobileNav();
    expect(useUIStore.getState().isMobileNavOpen).toBe(false);
  });
});

