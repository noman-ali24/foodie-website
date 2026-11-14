import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import SectionHeading from '../../components/shared/SectionHeading.jsx';
import FoodCard from '../../components/shared/FoodCard.jsx';
import AppButton from '../../components/shared/AppButton.jsx';
import MenuTabs from './MenuTabs.jsx';
import { MENU_DATA, MENU_TAB_CATEGORIES } from '../../data/menuData.js';

export default function PopularMenuSection({
  items = MENU_DATA,
  categories = MENU_TAB_CATEGORIES,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState('All');

  const visibleItems = useMemo(() => {
    if (activeTab === 'All') {
      return items;
    }
    return items.filter((item) => item.category === activeTab);
  }, [items, activeTab]);

  return (
    <section
      id="popular-menu"
      aria-labelledby="popular-menu-heading"
      className="py-16 sm:py-20 lg:py-24 bg-surface"
    >
      <PageContainer className="space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <SectionHeading
          id="popular-menu-heading"
          eyebrow="OUR POPULAR MENU"
          title="Explore Our"
          highlightedText="Delicious Menu"
          subtitle="Handpicked favorites made fresh and delivered straight to your door."
          align="center"
        />

        {/* Interactive Category Tabs */}
        <MenuTabs
          categories={categories}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Popular Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Bottom CTA: View Full Menu */}
        <div className="pt-4 flex justify-center">
          <AppButton
            component={Link}
            to="/menu"
            variant="secondary"
            size="lg"
            endIcon={<ArrowRight className="w-5 h-5" />}
          >
            View Full Menu
          </AppButton>
        </div>
      </PageContainer>
    </section>
  );
}
