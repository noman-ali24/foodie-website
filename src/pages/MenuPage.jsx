import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ChevronRight, Home } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer.jsx';
import SectionHeading from '../components/shared/SectionHeading.jsx';
import AppInput from '../components/shared/AppInput.jsx';
import FoodCard from '../components/shared/FoodCard.jsx';
import EmptyState from '../components/shared/EmptyState.jsx';
import MenuTabs from '../features/menu/MenuTabs.jsx';
import MenuSidebar from '../features/menu/MenuSidebar.jsx';
import MenuToolbar from '../features/menu/MenuToolbar.jsx';
import { PRICE_MIN, PRICE_MAX } from '../features/menu/MenuFilters.jsx';
import { MENU_DATA, MENU_TAB_CATEGORIES } from '../data/menuData.js';
import {
  resolveValidCategory,
  computeCategoryCounts,
  filterAndSortMenuItems,
} from '../features/menu/menuHelpers.js';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = resolveValidCategory(searchParams.get('category'));

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync local filter state when URL query parameters change externally (e.g., browser back/forward or header links)
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  // Calculate total dishes per category
  const categoryCounts = useMemo(() => computeCategoryCounts(MENU_DATA), []);

  // Determine active filter flags
  const isPriceFiltered =
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX;
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    isPriceFiltered ||
    minRating > 0 ||
    sortBy !== 'popular';

  const activeFilterCount = [
    selectedCategory !== 'All',
    isPriceFiltered,
    minRating > 0,
    sortBy !== 'popular',
  ].filter(Boolean).length;

  // Filter and sort dishes using pure domain helper
  const filteredItems = useMemo(
    () =>
      filterAndSortMenuItems(MENU_DATA, {
        searchQuery,
        selectedCategory,
        priceRange,
        minRating,
        sortBy,
      }),
    [searchQuery, selectedCategory, priceRange, minRating, sortBy]
  );

  const syncUrlParams = (nextSearch, nextCategory) => {
    const nextParams = new URLSearchParams(searchParams);
    const trimmedSearch = nextSearch.trim();

    if (trimmedSearch) {
      nextParams.set('search', trimmedSearch);
    } else {
      nextParams.delete('search');
    }

    if (nextCategory && nextCategory !== 'All') {
      nextParams.set('category', nextCategory);
    } else {
      nextParams.delete('category');
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    syncUrlParams(value, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    const validCat = resolveValidCategory(category);
    setSelectedCategory(validCat);
    syncUrlParams(searchQuery, validCat);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setMinRating(0);
    setSortBy('popular');
    if (searchParams.toString()) {
      setSearchParams({}, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    syncUrlParams('', selectedCategory);
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Page Header, Search Input & Category Tabs */}
      <section className="bg-gradient-to-b from-cream via-cream/60 to-surface pt-8 pb-10 sm:py-12 border-b border-border-warm">
        <PageContainer className="space-y-8">
          {/* Breadcrumb: Home / Menu */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-body"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-body hover:text-secondary transition-colors"
            >
              <Home className="w-4 h-4 text-secondary" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span
              className="font-heading font-semibold text-dark"
              aria-current="page"
            >
              Menu
            </span>
          </nav>

          {/* Section Heading */}
          <SectionHeading
            eyebrow="OUR MENU"
            title="Discover Your"
            highlightedText="Favorite Food"
            subtitle="Explore delicious meals prepared fresh and delivered to your doorstep."
            align="center"
          />

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface p-2 rounded-2xl sm:rounded-full border border-border-warm shadow-[var(--shadow-card)] focus-within:border-primary transition-colors">
              <AppInput
                name="menuSearch"
                ariaLabel="Search menu items"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search burgers, pizza, biryani..."
                size="small"
                startIcon={<Search className="w-5 h-5 text-secondary" />}
                endIcon={
                  searchQuery ? (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      aria-label="Clear search query"
                      className="p-1 rounded-full hover:bg-cream text-body hover:text-dark transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : undefined
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '9999px',
                    backgroundColor: 'transparent',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused': {
                      boxShadow: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Horizontal Category Tabs */}
          <div className="pt-1">
            <MenuTabs
              categories={MENU_TAB_CATEGORIES}
              activeTab={selectedCategory}
              onSelectTab={handleCategorySelect}
            />
          </div>
        </PageContainer>
      </section>

      {/* Main Content Area: Sidebar + Food Grid */}
      <PageContainer className="pt-8 sm:pt-12">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <MenuSidebar
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
            totalMatching={filteredItems.length}
            categories={MENU_TAB_CATEGORIES}
            categoryCounts={categoryCounts}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategorySelect}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex-1 w-full min-w-0 space-y-6">
            <MenuToolbar
              filteredCount={filteredItems.length}
              totalCount={MENU_DATA.length}
              selectedCategory={selectedCategory}
              onCategoryReset={() => handleCategorySelect('All')}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
              priceRange={priceRange}
              isPriceFiltered={isPriceFiltered}
              onResetPrice={() => setPriceRange([PRICE_MIN, PRICE_MAX])}
              minRating={minRating}
              onResetRating={() => setMinRating(0)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
              onResetAll={handleResetFilters}
              onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            />

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching dishes found"
                description="We couldn't find any dishes matching your current search or filter criteria. Try broadening your price range or resetting your filters."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
