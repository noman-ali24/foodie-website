import { MENU_DATA, MENU_TAB_CATEGORIES } from '../../data/menuData.js';

export function toSlug(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolves a category query parameter against MENU_TAB_CATEGORIES (case-insensitive).
 */
export function resolveValidCategory(
  param,
  categories = MENU_TAB_CATEGORIES
) {
  if (!param || typeof param !== 'string') return 'All';
  const match = categories.find(
    (cat) => cat.toLowerCase() === param.trim().toLowerCase()
  );
  return match || 'All';
}

/**
 * Finds a dish in MENU_DATA by exact ID or normalized name slug.
 */
export function findDishByIdOrSlug(idOrSlug, menuItems = MENU_DATA) {
  if (!idOrSlug || typeof idOrSlug !== 'string') return null;
  const target = idOrSlug.toLowerCase().trim();

  return (
    menuItems.find(
      (item) =>
        item.id.toLowerCase() === target || toSlug(item.name) === target
    ) || null
  );
}

/**
 * Returns up to `limit` related dishes, prioritizing dishes from the same category.
 */
export function getRelatedDishes(
  currentDish,
  menuItems = MENU_DATA,
  limit = 3
) {
  if (!currentDish) return [];

  const sameCategory = menuItems.filter(
    (item) =>
      item.id !== currentDish.id && item.category === currentDish.category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherPopular = menuItems.filter(
    (item) =>
      item.id !== currentDish.id && item.category !== currentDish.category
  );

  return [...sameCategory, ...otherPopular].slice(0, limit);
}

/**
 * Computes item counts per category from the authoritative menu dataset.
 */
export function computeCategoryCounts(
  menuItems = MENU_DATA,
  categories = MENU_TAB_CATEGORIES
) {
  const counts = { All: menuItems.length };
  categories.forEach((cat) => {
    if (cat !== 'All') {
      counts[cat] = menuItems.filter((item) => item.category === cat).length;
    }
  });
  return counts;
}

/**
 * Pure filtering and sorting function for menu catalog items.
 */
export function filterAndSortMenuItems(
  menuItems = MENU_DATA,
  {
    searchQuery = '',
    selectedCategory = 'All',
    priceRange = [0, Infinity],
    minRating = 0,
    sortBy = 'popular',
  } = {}
) {
  const queryTerms = searchQuery
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const [minPrice, maxPrice] = priceRange;

  const matching = menuItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    if (queryTerms.length > 0) {
      const searchableText =
        `${item.name} ${item.category} ${item.description}`.toLowerCase();
      const matchesAllTerms = queryTerms.every((term) =>
        searchableText.includes(term)
      );
      if (!matchesAllTerms) {
        return false;
      }
    }

    if (item.price < minPrice || item.price > maxPrice) {
      return false;
    }

    if (minRating > 0 && item.rating < minRating) {
      return false;
    }

    return true;
  });

  const sorted = [...matching];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating-desc') {
    sorted.sort(
      (a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount
    );
  } else {
    sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return sorted;
}
