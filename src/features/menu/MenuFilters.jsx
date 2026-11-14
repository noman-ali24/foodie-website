import Slider from '@mui/material/Slider';
import { Star, RotateCcw, ArrowUpDown, Tag, SlidersHorizontal } from 'lucide-react';
import AppButton from '../../components/shared/AppButton.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { MENU_TAB_CATEGORIES } from '../../data/menuData.js';

export const PRICE_MIN = 0;
export const PRICE_MAX = 2000;

export const RATING_OPTIONS = [
  { label: 'All Ratings', value: 0 },
  { label: '4.5+ Stars', value: 4.5 },
  { label: '4.0+ Stars', value: 4.0 },
];

export const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: Highest First', value: 'rating-desc' },
];

export default function MenuFilters({
  categories = MENU_TAB_CATEGORIES,
  categoryCounts = {},
  selectedCategory = 'All',
  onCategoryChange,
  priceRange = [PRICE_MIN, PRICE_MAX],
  onPriceChange,
  minRating = 0,
  onRatingChange,
  sortBy = 'popular',
  onSortChange,
  onReset,
  hasActiveFilters = false,
}) {
  const handleSliderChange = (_, newValue) => {
    if (Array.isArray(newValue)) {
      onPriceChange?.(newValue);
    }
  };

  return (
    <div className="space-y-7">
      {/* Header with Reset Action */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-border-warm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-secondary" />
          <h3 className="font-heading text-base font-bold text-dark">
            Filter &amp; Sort
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-dark transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-secondary" />
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const displayLabel = cat === 'All' ? 'All Categories' : cat;
            const count = categoryCounts[cat] ?? 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange?.(cat)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-dark font-bold shadow-2xs'
                    : 'text-body hover:bg-cream hover:text-dark'
                }`}
              >
                <span>{displayLabel}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-surface/90 text-dark'
                      : 'bg-cream text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range (PKR) */}
      <div className="space-y-3 pt-5 border-t border-border-warm">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted">
            Price Range (PKR)
          </h4>
        </div>

        <div className="px-2 pt-1">
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={50}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => formatPrice(val)}
            aria-label="Price range in PKR"
            sx={{
              color: '#FF7A00',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#FFB800',
                border: '2px solid #222222',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 6px rgba(255, 184, 0, 0.22)',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#F2EADF',
                opacity: 1,
              },
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex-1 rounded-xl bg-cream border border-border-warm px-3 py-2">
            <span className="text-[10px] text-muted block">Min</span>
            <span className="font-heading font-bold text-dark">
              {formatPrice(priceRange[0])}
            </span>
          </div>
          <span className="text-muted font-bold">–</span>
          <div className="flex-1 rounded-xl bg-cream border border-border-warm px-3 py-2 text-right">
            <span className="text-[10px] text-muted block">Max</span>
            <span className="font-heading font-bold text-dark">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Rating Filter */}
      <div className="space-y-3 pt-5 border-t border-border-warm">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((option) => {
            const isSelected = minRating === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onRatingChange?.(option.value)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-cream-strong border-primary text-dark font-bold'
                    : 'bg-surface border-border-warm text-body hover:bg-cream hover:text-dark'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Star
                    className={`w-4 h-4 ${
                      option.value > 0
                        ? 'fill-primary text-primary'
                        : 'text-muted'
                    }`}
                  />
                  {option.label}
                </span>
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-secondary bg-secondary'
                      : 'border-muted'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Sort By */}
      <div className="space-y-3 pt-5 border-t border-border-warm">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-secondary" />
          Sort By
        </h4>
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((option) => {
            const isSelected = sortBy === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSortChange?.(option.value)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-cream-strong border-primary text-dark font-bold'
                    : 'bg-surface border-border-warm text-body hover:bg-cream hover:text-dark'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Reset Button */}
      <div className="pt-4 border-t border-border-warm">
        <AppButton
          variant="outline"
          size="sm"
          fullWidth
          onClick={onReset}
          disabled={!hasActiveFilters}
          startIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset All Filters
        </AppButton>
      </div>
    </div>
  );
}

