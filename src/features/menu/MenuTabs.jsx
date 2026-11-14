import { MENU_TAB_CATEGORIES } from '../../data/menuData.js';

export default function MenuTabs({
  categories = MENU_TAB_CATEGORIES,
  activeTab = 'All',
  onSelectTab,
}) {
  return (
    <div
      role="tablist"
      aria-label="Food categories"
      className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-2 no-scrollbar"
    >
      {categories.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectTab?.(tab)}
            className={`px-5 py-2.5 rounded-full font-heading text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer border ${
              isActive
                ? 'bg-primary border-primary text-dark shadow-[var(--shadow-btn-primary)] -translate-y-0.5'
                : 'bg-surface border-border-warm text-body hover:text-dark hover:border-primary/60 hover:bg-cream'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

