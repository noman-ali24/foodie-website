import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import {
  Star,
  Clock,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Bike,
  Utensils,
} from 'lucide-react';
import AppButton from '../../components/shared/AppButton.jsx';
import AppInput from '../../components/shared/AppInput.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { useCartStore } from '../../store/useCartStore.js';
import { useUIStore } from '../../store/useUIStore.js';

const QUALITY_HIGHLIGHTS = [
  { icon: Utensils, label: 'Prepared Fresh to Order' },
  { icon: Bike, label: 'Fast 25–30 Min Delivery' },
  { icon: ShieldCheck, label: '100% Quality Ingredients' },
];

export default function FoodDetailsContent({ food, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const addItem = useCartStore((state) => state.addItem);
  const showNotification = useUIStore((state) => state.showNotification);

  // Reset local state when switching between different food items
  useEffect(() => {
    setQuantity(1);
    setInstructions('');
  }, [food?.id]);

  if (!food) return null;

  const {
    name,
    description,
    price,
    originalPrice,
    category,
    rating = 4.8,
    reviewsCount = 120,
    prepTime = '20–25 min',
    badge,
    isPopular,
    image,
  } = food;

  const badgeText = badge || (isPopular ? 'Popular' : null);
  const starCount = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
  const totalPrice = (Number(price) || 0) * quantity;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddAction = () => {
    const result = addItem(food, quantity, instructions);
    if (result.ok) {
      showNotification(
        `Item added to your cart: ${name} (×${quantity})`,
        'success'
      );
      onAddToCart?.(food, result);
      setQuantity(1);
      setInstructions('');
    } else {
      showNotification(
        result.error || 'Unable to add this item to your cart.',
        'error'
      );
    }
  };

  return (
    <Card className="rounded-3xl sm:rounded-[2rem] bg-surface border border-border-warm p-5 sm:p-8 lg:p-10 shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Large Product Image */}
        <div className="lg:col-span-6">
          <div className="relative h-72 sm:h-96 lg:h-[440px] w-full rounded-3xl bg-cream overflow-hidden border border-border-warm shadow-sm">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted font-medium">
                No Image Available
              </div>
            )}

            {/* Top-Left Badge */}
            {badgeText && (
              <div className="absolute top-4 left-4">
                <Chip
                  icon={<Flame className="w-4 h-4 text-white" />}
                  label={badgeText}
                  className="bg-secondary text-white font-semibold text-xs px-1.5 shadow-md"
                />
              </div>
            )}

            {/* Top-Right Prep Time Pill */}
            {prepTime && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-surface/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-border-warm">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold text-dark">{prepTime}</span>
              </div>
            )}
          </div>

          {/* Quality Trust Strip Below Image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {QUALITY_HIGHLIGHTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-2xl bg-cream/70 border border-border-warm px-3.5 py-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/25 text-secondary flex items-center justify-center shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-dark leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dish Information & Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Rating Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {category && (
                <Link
                  to={`/menu?category=${encodeURIComponent(category)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-strong text-secondary font-heading text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-colors"
                >
                  {category}
                </Link>
              )}

              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`Rated ${rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < starCount
                          ? 'fill-primary text-primary'
                          : 'text-border-warm'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-heading text-sm font-extrabold text-dark">
                  {Number(rating).toFixed(1)}
                </span>
                <span className="text-xs font-medium text-muted">
                  ({reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Dish Name */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark tracking-tight leading-tight">
              {name}
            </h1>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-secondary">
                {formatPrice(price)}
              </span>
              {originalPrice && Number(originalPrice) > Number(price) && (
                <>
                  <span className="text-base text-muted line-through font-medium">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    Save {formatPrice(Number(originalPrice) - Number(price))}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-body leading-relaxed pt-1">
              {description}
            </p>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl bg-cream/60 border border-border-warm px-4 py-3">
                <span className="text-xs text-muted block">Category</span>
                <span className="font-heading text-sm font-bold text-dark">
                  {category}
                </span>
              </div>
              <div className="rounded-2xl bg-cream/60 border border-border-warm px-4 py-3">
                <span className="text-xs text-muted block">
                  Preparation Time
                </span>
                <span className="font-heading text-sm font-bold text-dark">
                  {prepTime}
                </span>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="pt-2 border-t border-border-warm">
            <AppInput
              label="Special Instructions"
              name="specialInstructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add special instructions (optional)"
              multiline
              rows={2}
            />
          </div>

          {/* Quantity Selector & Add to Cart Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between sm:justify-start gap-3 bg-cream border border-border-warm rounded-full px-3 py-1.5 shrink-0">
              <span className="text-xs font-semibold text-body pl-2 sm:hidden">
                Quantity
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  size="small"
                  className="w-9 h-9 rounded-full bg-surface border border-border-warm text-dark hover:bg-primary disabled:opacity-40"
                >
                  <Minus className="w-4 h-4" />
                </IconButton>

                <span
                  aria-live="polite"
                  className="min-w-[2.25rem] text-center font-heading text-base font-extrabold text-dark"
                >
                  {quantity}
                </span>

                <IconButton
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                  size="small"
                  className="w-9 h-9 rounded-full bg-surface border border-border-warm text-dark hover:bg-primary"
                >
                  <Plus className="w-4 h-4" />
                </IconButton>
              </div>
            </div>

            {/* Add to Cart CTA Connected to Zustand Store */}
            <div className="flex-1">
              <AppButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddAction}
                startIcon={<ShoppingBag className="w-5 h-5" />}
              >
                Add to Cart • {formatPrice(totalPrice)}
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
