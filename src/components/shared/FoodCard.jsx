import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { Star, Plus, Clock, Flame } from 'lucide-react';
import AppButton from './AppButton.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { useCartStore } from '../../store/useCartStore.js';
import { useUIStore } from '../../store/useUIStore.js';

export default function FoodCard({
  food,
  onAddToCart,
  detailLink,
  className = '',
}) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const showNotification = useUIStore((state) => state.showNotification);

  if (!food) return null;

  const {
    id,
    name,
    description,
    price,
    originalPrice,
    rating = 4.8,
    reviewsCount,
    image,
    category,
    prepTime,
    badge,
    isPopular,
  } = food;

  const targetUrl = detailLink ?? (id ? `/menu/${id}` : undefined);
  const badgeText = badge || (isPopular ? 'Popular' : null);

  const handleAddClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const result = addItem(food, 1, '');
    if (result.ok) {
      showNotification(`Item added to your cart: ${name}`, 'success');
      onAddToCart?.(food, result);
    } else {
      showNotification(
        result.error || 'Unable to add this item to your cart.',
        'error'
      );
    }
  };

  const handleImageClick = () => {
    if (targetUrl) {
      navigate(targetUrl);
    }
  };

  return (
    <Card
      className={`group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-surface border border-border-warm p-4 sm:p-5 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 ${className}`.trim()}
    >
      <div>
        {/* Image Header */}
        <div
          onClick={targetUrl ? handleImageClick : undefined}
          className={`relative h-48 sm:h-52 w-full rounded-2xl bg-cream overflow-hidden mb-4 flex items-center justify-center ${
            targetUrl ? 'cursor-pointer' : ''
          }`.trim()}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-muted text-sm font-medium">No Image</div>
          )}

          {/* Top Left Badge */}
          {badgeText && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <Chip
                size="small"
                icon={<Flame className="w-3.5 h-3.5 text-white" />}
                label={badgeText}
                className="bg-secondary text-white font-semibold text-xs px-1 shadow-sm"
              />
            </div>
          )}

          {/* Top Right Rating Pill */}
          <div className="absolute top-3 right-3 pointer-events-none flex items-center gap-1 bg-surface/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-border-warm">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-xs font-bold text-dark">
              {Number(rating).toFixed(1)}
            </span>
            {typeof reviewsCount === 'number' && (
              <span className="text-[11px] text-muted">({reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Category & Prep Time Meta */}
        {(category || prepTime) && (
          <div className="flex items-center justify-between gap-2 text-xs text-muted mb-1.5">
            {category && (
              <span className="font-semibold uppercase tracking-wider text-secondary">
                {category}
              </span>
            )}
            {prepTime && (
              <span className="inline-flex items-center gap-1 font-medium text-body">
                <Clock className="w-3.5 h-3.5 text-primary-dark" />
                {prepTime}
              </span>
            )}
          </div>
        )}

        {/* Dish Title */}
        <h3 className="font-heading text-lg font-bold text-dark line-clamp-1">
          {targetUrl ? (
            <Link
              to={targetUrl}
              className="block text-dark group-hover:text-secondary transition-colors"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-body mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-border-warm">
        <div>
          <span className="text-xs text-muted block">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-extrabold text-dark">
              {formatPrice(price)}
            </span>
            {originalPrice && Number(originalPrice) > Number(price) && (
              <span className="text-xs text-muted line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        <AppButton
          variant="primary"
          size="sm"
          onClick={handleAddClick}
          startIcon={<Plus className="w-4 h-4" />}
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </AppButton>
      </div>
    </Card>
  );
}
