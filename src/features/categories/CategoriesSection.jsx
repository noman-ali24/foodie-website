import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer.jsx';
import SectionHeading from '../../components/shared/SectionHeading.jsx';
import CategoryCard from '../../components/shared/CategoryCard.jsx';
import { CATEGORIES_DATA } from '../../data/categoriesData.js';

export default function CategoriesSection({
  categories = CATEGORIES_DATA,
  onSelectCategory,
}) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
      return;
    }
    if (category?.name) {
      navigate(`/menu?category=${encodeURIComponent(category.name)}`);
    }
  };

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="py-16 sm:py-20 lg:py-24 bg-cream/60 border-y border-border-warm"
    >
      <PageContainer className="space-y-12">
        <SectionHeading
          id="categories-heading"
          eyebrow="EXPLORE OUR MENU"
          title="Browse Our"
          highlightedText="Food Categories"
          subtitle="Discover something delicious from our wide range of food categories."
          align="center"
        />

        {/* Responsive Grid: 2 cols mobile/tablet, 3 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
