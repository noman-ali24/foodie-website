import Chip from '@mui/material/Chip';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { SORT_OPTIONS, PRICE_MIN, PRICE_MAX } from './MenuFilters.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

export default function MenuToolbar({
  filteredCount = 0,
  totalCount = 0,
  selectedCategory = 'All',
  onCategoryReset,
  searchQuery = '',
  onClearSearch,
  priceRange = [PRICE_MIN, PRICE_MAX],
  isPriceFiltered = false,
  onResetPrice,
  minRating = 0,
  onResetRating,
  sortBy = 'popular',
  onSortChange,
  hasActiveFilters = false,
  activeFilterCount = 0,
  onResetAll,
  onOpenMobileFilters,
}) {
  return (
    <div className="space-y-4">
      {/* Results Count, Mobile Filter Trigger & Quick Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cream/60 border border-border-warm rounded-2xl px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-3">
          {/* Mobile / Tablet Filter Button */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-warm font-heading text-xs sm:text-sm font-bold text-dark hover:border-primary shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-secondary" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-secondary text-white text-[11px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-xs sm:text-sm text-body">
            Showing{' '}
            <span className="font-heading font-bold text-dark">
              {filteredCount}
            </span>{' '}
            of{' '}
            <span className="font-heading font-bold text-dark">
              {totalCount}
            </span>{' '}
            {filteredCount === 1 ? 'dish' : 'dishes'}
            {selectedCategory !== 'All' && (
              <span>
                {' '}
                in{' '}
                <strong className="text-secondary">{selectedCategory}</strong>
              </span>
            )}
          </p>
        </div>

        {/* Quick Sort Selector */}
        <div className="flex items-center gap-2 ml-auto">
          <label
            htmlFor="menu-quick-sort"
            className="text-xs font-semibold text-muted hidden sm:inline"
          >
            Sort by:
          </label>
          <select
            id="menu-quick-sort"
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="rounded-full bg-surface border border-border-warm px-3.5 py-1.5 font-heading text-xs sm:text-sm font-semibold text-dark focus:outline-none focus:border-primary cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted mr-1">
            Active filters:
          </span>

          {selectedCategory !== 'All' && (
            <Chip
              size="small"
              label={`Category: ${selectedCategory}`}
              onDelete={onCategoryReset}
              className="bg-cream-strong text-dark font-semibold text-xs"
            />
          )}

          {searchQuery.trim() !== '' && (
            <Chip
              size="small"
              label={`Search: "${searchQuery.trim()}"`}
              onDelete={onClearSearch}
              className="bg-cream-strong text-dark font-semibold text-xs"
            />
          )}

          {isPriceFiltered && (
            <Chip
              size="small"
              label={`${formatPrice(priceRange[0])} – ${formatPrice(priceRange[1])}`}
              onDelete={onResetPrice}
              className="bg-cream-strong text-dark font-semibold text-xs"
            />
          )}

          {minRating > 0 && (
            <Chip
              size="small"
              label={`${minRating}+ Stars`}
              onDelete={onResetRating}
              className="bg-cream-strong text-dark font-semibold text-xs"
            />
          )}

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline ml-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

