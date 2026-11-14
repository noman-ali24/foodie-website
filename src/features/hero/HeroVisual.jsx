import { Link } from 'react-router-dom';
import { Star, Clock, Bike, ShieldCheck, Flame } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice.js';
import { MENU_DATA } from '../../data/menuData.js';

const FEATURED_HERO_DISH = MENU_DATA[0];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none flex items-center justify-center pt-6 pb-10 sm:py-6 lg:py-0">
      {/* Decorative Background Glow & Warm Rings */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-secondary/15 to-transparent rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="w-64 h-64 sm:w-96 sm:h-96 lg:w-[430px] lg:h-[430px] rounded-full bg-gradient-to-br from-primary/35 via-cream-strong to-secondary/20 border-2 border-dashed border-primary/50 flex items-center justify-center p-3.5 sm:p-6 shadow-[var(--shadow-card)]"
      >
        {/* Main Hero Food Platter Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-6 sm:border-8 border-surface shadow-2xl bg-cream">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
            alt="Gourmet double cheeseburger with fresh ingredients"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Top-Left Floating Delivery Badge */}
      <div className="animate-float-slow absolute top-0 left-0 sm:left-2 lg:-left-4 bg-surface/95 backdrop-blur-md border border-border-warm rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-[var(--shadow-floating)] flex items-center gap-2.5 sm:gap-3">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/25 text-secondary flex items-center justify-center shrink-0">
          <Bike className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <p className="font-heading text-xs sm:text-sm font-bold text-dark leading-tight">
            Express Delivery
          </p>
          <p className="text-[11px] sm:text-xs text-body font-medium flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-secondary shrink-0" />
            25–30 mins
          </p>
        </div>
      </div>

      {/* Top-Right Floating Rating Badge */}
      <div className="absolute top-16 sm:top-6 right-0 sm:right-2 lg:-right-2 bg-surface/95 backdrop-blur-md border border-border-warm rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[var(--shadow-floating)] flex items-center gap-2 sm:gap-2.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary text-dark flex items-center justify-center shrink-0 shadow-xs">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-dark text-dark" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-heading text-xs sm:text-sm font-extrabold text-dark">
              4.9
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-secondary">
              (2.4k+ Reviews)
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-body font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            100% Fresh Quality
          </p>
        </div>
      </div>

      {/* Bottom Floating Featured Mini Dish Card */}
      <Link
        to={`/menu/${FEATURED_HERO_DISH.id}`}
        className="group absolute bottom-0 left-2 right-2 sm:left-auto sm:right-4 lg:-bottom-4 lg:right-2 sm:w-72 bg-surface/95 backdrop-blur-md border border-border-warm rounded-2xl p-2.5 sm:p-3 shadow-[var(--shadow-floating)] hover:border-primary transition-all flex items-center gap-3"
      >
        <img
          src={FEATURED_HERO_DISH.image}
          alt={FEATURED_HERO_DISH.name}
          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-cream group-hover:scale-105 transition-transform"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-secondary">
            <Flame className="w-3.5 h-3.5 fill-secondary" />
            <span>Trending Now</span>
          </div>
          <p className="font-heading text-sm font-bold text-dark truncate group-hover:text-secondary transition-colors">
            {FEATURED_HERO_DISH.name}
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="font-heading text-sm font-extrabold text-dark">
              {formatPrice(FEATURED_HERO_DISH.price)}
            </span>
            <span className="text-[11px] font-semibold text-secondary underline">
              View Dish →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

