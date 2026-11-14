import { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer.jsx';
import EmptyState from '../components/shared/EmptyState.jsx';
import FoodDetailsContent from '../features/menu/FoodDetailsContent.jsx';
import RelatedDishesSection from '../features/menu/RelatedDishesSection.jsx';
import {
  findDishByIdOrSlug,
  getRelatedDishes,
} from '../features/menu/menuHelpers.js';

export default function FoodDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Resolve dish by exact id or normalized slug
  const food = useMemo(() => findDishByIdOrSlug(id), [id]);

  // Compute 3 related dishes (prioritizing same category, then popular items)
  const relatedItems = useMemo(() => getRelatedDishes(food, undefined, 3), [food]);

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="bg-cream/60 border-b border-border-warm py-4">
        <PageContainer className="flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-body"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-body hover:text-secondary transition-colors"
            >
              <Home className="w-4 h-4 text-secondary" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-muted shrink-0" />
            <Link
              to="/menu"
              className="text-body hover:text-secondary transition-colors"
            >
              Menu
            </Link>
            <ChevronRight className="w-4 h-4 text-muted shrink-0" />
            <span
              className="font-heading font-semibold text-dark truncate max-w-[200px] sm:max-w-xs"
              aria-current="page"
            >
              {food ? food.name : 'Dish Not Found'}
            </span>
          </nav>

          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-semibold text-secondary hover:text-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </Link>
        </PageContainer>
      </div>

      {/* Main Details Content & Related Items */}
      <PageContainer className="pt-8 sm:pt-12 space-y-16">
        {food ? (
          <>
            <FoodDetailsContent food={food} />

            <RelatedDishesSection
              items={relatedItems}
              categoryName={food.category}
            />
          </>
        ) : (
          <div className="py-8">
            <EmptyState
              title="Dish Not Found"
              description="We couldn't find the food item you're looking for. It may have been moved or removed from our menu."
              actionLabel="Back to Menu"
              onAction={() => navigate('/menu')}
            />
          </div>
        )}
      </PageContainer>
    </div>
  );
}
