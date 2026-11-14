import { Link } from 'react-router-dom';
import SectionHeading from '../../components/shared/SectionHeading.jsx';
import FoodCard from '../../components/shared/FoodCard.jsx';
import AppButton from '../../components/shared/AppButton.jsx';

export default function RelatedDishesSection({
  items = [],
  categoryName = 'Menu',
  onAddToCart,
}) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="related-dishes-heading"
      className="space-y-8 pt-6 border-t border-border-warm"
    >
      <SectionHeading
        id="related-dishes-heading"
        eyebrow="YOU MAY ALSO LIKE"
        title="Related"
        highlightedText="Delicious Dishes"
        subtitle={`More freshly prepared favorites to pair with your ${categoryName.toLowerCase()} craving.`}
        align="left"
        action={
          <AppButton
            component={Link}
            to="/menu"
            variant="outline"
            size="sm"
          >
            Explore Full Menu
          </AppButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            food={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

