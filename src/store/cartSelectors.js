import { MENU_DATA } from '../data/menuData.js';

export const DELIVERY_FEE_PKR = 150;

// Fast O(1) lookup map for authoritative product data
const MENU_PRODUCT_MAP = new Map(MENU_DATA.map((item) => [item.id, item]));

export function getProductById(productId) {
  if (!productId || typeof productId !== 'string') return null;
  return MENU_PRODUCT_MAP.get(productId) || null;
}

export function isValidProductId(productId) {
  return Boolean(getProductById(productId));
}

export function normalizeInstructions(instructions = '') {
  if (typeof instructions !== 'string') return '';
  return instructions.trim().replace(/\s+/g, ' ');
}

export function buildCartLineId(productId, instructions = '') {
  const cleanInstructions = normalizeInstructions(instructions).toLowerCase();
  return cleanInstructions
    ? `${productId}::${cleanInstructions}`
    : `${productId}::default`;
}

/**
 * Resolves raw cart lines against authoritative MENU_DATA.
 * Safely ignores missing or outdated product IDs.
 */
export function resolveCartItems(items = []) {
  if (!Array.isArray(items)) return [];

  return items.reduce((acc, line) => {
    if (!line || typeof line !== 'object') return acc;
    const product = getProductById(line.productId);
    const qty = Number(line.quantity);

    if (!product || !Number.isInteger(qty) || qty < 1) {
      return acc;
    }

    const unitPrice = Number(product.price) || 0;
    const instructions = normalizeInstructions(line.instructions);
    const lineId = line.lineId || buildCartLineId(product.id, instructions);

    acc.push({
      lineId,
      productId: product.id,
      quantity: qty,
      instructions,
      product,
      unitPrice,
      lineTotal: unitPrice * qty,
    });

    return acc;
  }, []);
}

// WeakMap caches keyed on raw items array reference to guarantee
// React 19 useSyncExternalStore snapshot stability across multiple consumers
const EMPTY_RESOLVED_ITEMS = Object.freeze([]);
const EMPTY_CART_SUMMARY = Object.freeze({
  items: EMPTY_RESOLVED_ITEMS,
  totalUnits: 0,
  lineCount: 0,
  subtotal: 0,
  deliveryFee: 0,
  grandTotal: 0,
  isEmpty: true,
});

const resolvedItemsCache = new WeakMap();
const cartSummaryCache = new WeakMap();

/**
 * Zustand Selectors (Keep derived calculations out of state & components)
 */
export const selectRawCartItems = (state) => state?.items ?? EMPTY_RESOLVED_ITEMS;

export const selectResolvedCartItems = (state) => {
  const rawItems = state?.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return EMPTY_RESOLVED_ITEMS;
  }

  if (resolvedItemsCache.has(rawItems)) {
    return resolvedItemsCache.get(rawItems);
  }

  const resolved = resolveCartItems(rawItems);
  const output = resolved.length === 0 ? EMPTY_RESOLVED_ITEMS : resolved;
  resolvedItemsCache.set(rawItems, output);
  return output;
};

export const selectTotalUnits = (state) => {
  if (!Array.isArray(state?.items)) return 0;
  return state.items.reduce((total, line) => {
    if (!isValidProductId(line?.productId)) return total;
    const qty = Number(line.quantity);
    return Number.isInteger(qty) && qty > 0 ? total + qty : total;
  }, 0);
};

export const selectDistinctLineCount = (state) => {
  if (!Array.isArray(state?.items)) return 0;
  return state.items.filter(
    (line) =>
      isValidProductId(line?.productId) &&
      Number.isInteger(Number(line?.quantity)) &&
      Number(line.quantity) >= 1
  ).length;
};

export const selectCartSubtotal = (state) => {
  if (!Array.isArray(state?.items)) return 0;
  return state.items.reduce((sum, line) => {
    const product = getProductById(line?.productId);
    const qty = Number(line?.quantity);
    if (!product || !Number.isInteger(qty) || qty < 1) return sum;
    return sum + (Number(product.price) || 0) * qty;
  }, 0);
};

export const selectDeliveryFee = (state) => {
  const subtotal = selectCartSubtotal(state);
  return subtotal > 0 ? DELIVERY_FEE_PKR : 0;
};

export const selectGrandTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE_PKR : 0;
  return subtotal + deliveryFee;
};

export const selectCartSummary = (state) => {
  const rawItems = state?.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return EMPTY_CART_SUMMARY;
  }

  if (cartSummaryCache.has(rawItems)) {
    return cartSummaryCache.get(rawItems);
  }

  const resolvedItems = selectResolvedCartItems(state);
  if (resolvedItems.length === 0) {
    cartSummaryCache.set(rawItems, EMPTY_CART_SUMMARY);
    return EMPTY_CART_SUMMARY;
  }

  const totalUnits = resolvedItems.reduce((sum, item) => sum + item.quantity, 0);
  const lineCount = resolvedItems.length;
  const subtotal = resolvedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE_PKR : 0;
  const grandTotal = subtotal + deliveryFee;

  const summary = {
    items: resolvedItems,
    totalUnits,
    lineCount,
    subtotal,
    deliveryFee,
    grandTotal,
    isEmpty: false,
  };

  cartSummaryCache.set(rawItems, summary);
  return summary;
};
