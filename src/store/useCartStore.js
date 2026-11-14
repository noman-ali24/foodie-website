import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  getProductById,
  isValidProductId,
  normalizeInstructions,
  buildCartLineId,
} from './cartSelectors.js';

export const CART_STORAGE_KEY = 'foodie-cart-storage';
export const CART_STORE_VERSION = 1;

function parsePositiveInteger(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  const intVal = Math.floor(num);
  return intVal >= 1 ? intVal : null;
}

/**
 * Sanitizes persisted cart items on rehydration or migration.
 * Deduplicates matching lineIds and strips invalid/outdated productIds.
 */
export function sanitizeCartItems(rawItems) {
  if (!Array.isArray(rawItems)) return [];

  const mergedMap = new Map();

  rawItems.forEach((entry) => {
    if (!entry || typeof entry !== 'object') return;
    const productId =
      typeof entry.productId === 'string' ? entry.productId.trim() : '';
    if (!isValidProductId(productId)) return;

    const validQty = parsePositiveInteger(entry.quantity);
    if (!validQty) return;

    const cleanInstructions = normalizeInstructions(entry.instructions);
    const lineId = buildCartLineId(productId, cleanInstructions);

    if (mergedMap.has(lineId)) {
      const existing = mergedMap.get(lineId);
      existing.quantity += validQty;
    } else {
      mergedMap.set(lineId, {
        lineId,
        productId,
        quantity: validQty,
        instructions: cleanInstructions,
      });
    }
  });

  return Array.from(mergedMap.values());
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      /**
       * Adds a product to the cart.
       * - Same product + matching instructions increments quantity.
       * - Different instructions creates a separate cart line.
       */
      addItem: (productOrId, quantity = 1, instructions = '') => {
        const productId =
          typeof productOrId === 'string'
            ? productOrId.trim()
            : productOrId?.id?.trim?.() || '';

        const product = getProductById(productId);
        if (!product) {
          return {
            ok: false,
            error: 'Invalid or unavailable product.',
          };
        }

        const validQty = parsePositiveInteger(quantity);
        if (!validQty) {
          return {
            ok: false,
            error: 'Quantity must be a positive integer.',
          };
        }

        const rawInstructions =
          typeof instructions === 'string' && instructions.trim() !== ''
            ? instructions
            : typeof productOrId === 'object' &&
                typeof productOrId?.specialInstructions === 'string'
              ? productOrId.specialInstructions
              : '';

        const cleanInstructions = normalizeInstructions(rawInstructions);
        const targetLineId = buildCartLineId(product.id, cleanInstructions);

        set((state) => {
          const currentItems = Array.isArray(state.items) ? state.items : [];
          const existingIndex = currentItems.findIndex(
            (item) => item.lineId === targetLineId
          );

          if (existingIndex > -1) {
            const updated = [...currentItems];
            const currentLine = updated[existingIndex];
            updated[existingIndex] = {
              ...currentLine,
              quantity: currentLine.quantity + validQty,
            };
            return { items: updated };
          }

          return {
            items: [
              ...currentItems,
              {
                lineId: targetLineId,
                productId: product.id,
                quantity: validQty,
                instructions: cleanInstructions,
              },
            ],
          };
        });

        return {
          ok: true,
          lineId: targetLineId,
          product,
          addedQuantity: validQty,
        };
      },

      /**
       * Removes a single cart line by lineId.
       */
      removeItem: (lineId) => {
        if (!lineId || typeof lineId !== 'string') return;
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        }));
      },

      /**
       * Increases quantity of a cart line by 1.
       */
      increaseQuantity: (lineId) => {
        if (!lineId || typeof lineId !== 'string') return;
        set((state) => ({
          items: state.items.map((item) =>
            item.lineId === lineId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      /**
       * Decreases quantity of a cart line by 1 (never drops below 1).
       */
      decreaseQuantity: (lineId) => {
        if (!lineId || typeof lineId !== 'string') return;
        set((state) => ({
          items: state.items.map((item) =>
            item.lineId === lineId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        }));
      },

      /**
       * Directly updates quantity of a cart line to a valid positive integer (>= 1).
       */
      updateQuantity: (lineId, quantity) => {
        if (!lineId || typeof lineId !== 'string') return false;
        const validQty = parsePositiveInteger(quantity);
        if (!validQty) return false;

        set((state) => ({
          items: state.items.map((item) =>
            item.lineId === lineId ? { ...item, quantity: validQty } : item
          ),
        }));
        return true;
      },

      /**
       * Removes all items from the cart.
       */
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: CART_STORAGE_KEY,
      version: CART_STORE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return { items: [] };
        }
        return {
          items: sanitizeCartItems(persistedState.items),
        };
      },
      merge: (persistedState, currentState) => ({
        ...currentState,
        items: sanitizeCartItems(persistedState?.items ?? currentState.items),
      }),
    }
  )
);

export default useCartStore;

