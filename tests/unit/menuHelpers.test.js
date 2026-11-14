import { describe, it, expect } from 'vitest';
import {
  toSlug,
  resolveValidCategory,
  findDishByIdOrSlug,
  getRelatedDishes,
  computeCategoryCounts,
  filterAndSortMenuItems,
} from '../../src/features/menu/menuHelpers.js';
import { formatPrice } from '../../src/utils/formatPrice.js';
import { MENU_DATA } from '../../src/data/menuData.js';

describe('Unit: menuHelpers & formatPrice', () => {
  it('resolves dishes by exact ID or normalized slug and returns null for invalid IDs', () => {
    const byId = findDishByIdOrSlug('wood-fired-pepperoni-pizza');
    expect(byId).toBeTruthy();
    expect(byId.price).toBe(1650);

    const bySlug = findDishByIdOrSlug(toSlug(byId.name));
    expect(bySlug.id).toBe(byId.id);

    expect(findDishByIdOrSlug('invalid-non-existent-dish')).toBeNull();
    expect(findDishByIdOrSlug(null)).toBeNull();
  });

  it('computes related dishes prioritizing same category and excluding current dish', () => {
    const burger = findDishByIdOrSlug('smoky-double-smash-burger');
    const related = getRelatedDishes(burger, MENU_DATA, 3);
    expect(related).toHaveLength(3);
    expect(related.every((d) => d.id !== burger.id)).toBe(true);
    expect(related[0].category).toBe('Burgers');
  });

  it('validates categories, computes category counts, and filters/sorts menu items accurately', () => {
    expect(resolveValidCategory('pizza')).toBe('Pizza');
    expect(resolveValidCategory('  fast food ')).toBe('Fast Food');
    expect(resolveValidCategory('unknown-category')).toBe('All');

    const counts = computeCategoryCounts(MENU_DATA);
    expect(counts.All).toBe(MENU_DATA.length);
    expect(counts.Burgers).toBe(2);
    expect(counts.Pizza).toBe(2);

    const sortedAsc = filterAndSortMenuItems(MENU_DATA, {
      selectedCategory: 'All',
      sortBy: 'price-asc',
    });
    expect(sortedAsc[0].price).toBeLessThanOrEqual(sortedAsc[1].price);

    const sortedDesc = filterAndSortMenuItems(MENU_DATA, {
      selectedCategory: 'All',
      sortBy: 'price-desc',
    });
    expect(sortedDesc[0].price).toBeGreaterThanOrEqual(sortedDesc[1].price);

    const highRated = filterAndSortMenuItems(MENU_DATA, {
      minRating: 4.9,
    });
    expect(highRated.every((d) => d.rating >= 4.9)).toBe(true);

    const priceFiltered = filterAndSortMenuItems(MENU_DATA, {
      priceRange: [500, 1000],
    });
    expect(
      priceFiltered.every((d) => d.price >= 500 && d.price <= 1000)
    ).toBe(true);
  });

  it('matches all Hero quick-search tags and multi-word queries across name, category, and description', () => {
    const heroTags = [
      'Smash Burger',
      'Pepperoni Pizza',
      'Loaded Fries',
      'Dum Biryani',
    ];
    for (const tag of heroTags) {
      const matches = filterAndSortMenuItems(MENU_DATA, { searchQuery: tag });
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('formats PKR currency values safely', () => {
    expect(formatPrice(950)).toBe('Rs. 950');
    expect(formatPrice(1650)).toBe('Rs. 1,650');
    expect(formatPrice(null)).toBe('Rs. 0');
    expect(formatPrice('invalid')).toBe('Rs. 0');
  });
});

