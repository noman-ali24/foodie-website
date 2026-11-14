import {
  UtensilsCrossed,
  Star,
  Bike,
  Clock,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice.js';
import { MENU_DATA } from '../../data/menuData.js';

const PRIMARY_PROMO_DISH = MENU_DATA[0];
const SECONDARY_PROMO_DISH = MENU_DATA[1];

export default function AppPromotionVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-md flex items-center justify-center py-4">
      {/* Warm Ambient Glow Behind Phone */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-secondary/25 to-transparent rounded-full blur-3xl -z-10"
      />

      {/* Smartphone Mockup Frame */}
      <div className="relative w-72 sm:w-80 rounded-[2.75rem] border-[10px] border-dark bg-surface shadow-2xl overflow-hidden">
        {/* Top Speaker Notch */}
        <div className="bg-dark h-6 w-32 mx-auto rounded-b-2xl flex items-center justify-center">
          <span className="w-12 h-1.5 rounded-full bg-neutral-700" />
        </div>

        {/* Phone Screen Interface */}
        <div className="p-4 bg-cream/70 space-y-3.5">
          {/* App Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-dark flex items-center justify-center shadow-2xs">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-extrabold text-dark leading-none">
                  Fast<span className="text-secondary">Food</span>
                </p>
                <p className="text-[10px] text-muted font-medium mt-0.5">
                  Delivering to Downtown
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cream-strong text-secondary font-heading text-[10px] font-bold">
              25 Min
            </span>
          </div>

          {/* Featured Promo Card Inside Phone */}
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-border-warm shadow-xs">
            <div className="relative h-36 w-full bg-cream">
              <img
                src={PRIMARY_PROMO_DISH.image}
                alt={`${PRIMARY_PROMO_DISH.name} preview`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-white text-[10px] font-bold shadow-xs">
                <Flame className="w-3 h-3 fill-white" />
                Hot Deal
              </span>
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-heading text-xs font-bold text-dark truncate">
                  {PRIMARY_PROMO_DISH.name}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-body mt-0.5">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="font-bold text-dark">
                    {PRIMARY_PROMO_DISH.rating}
                  </span>
                  <span className="text-muted">
                    • {PRIMARY_PROMO_DISH.prepTime}
                  </span>
                </div>
              </div>
              <span className="font-heading text-xs font-extrabold text-secondary bg-cream px-2.5 py-1 rounded-lg shrink-0">
                {formatPrice(PRIMARY_PROMO_DISH.price)}
              </span>
            </div>
          </div>

          {/* Secondary Mini Item Row */}
          <div className="rounded-2xl bg-surface border border-border-warm p-2.5 flex items-center gap-3 shadow-2xs">
            <img
              src={SECONDARY_PROMO_DISH.image}
              alt={`${SECONDARY_PROMO_DISH.name} preview`}
              loading="lazy"
              className="w-12 h-12 rounded-xl object-cover shrink-0 bg-cream"
            />
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xs font-bold text-dark truncate">
                {SECONDARY_PROMO_DISH.name}
              </p>
              <p className="text-[11px] font-bold text-secondary">
                {formatPrice(SECONDARY_PROMO_DISH.price)}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary text-dark font-heading text-[10px] font-bold">
              + Add
            </span>
          </div>

          {/* Live Order Status Pill Inside Screen */}
          <div className="rounded-2xl bg-dark text-white p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-dark flex items-center justify-center shrink-0">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <p className="font-heading text-[11px] font-bold leading-tight">
                  Freshly Prepared
                </p>
                <p className="text-[10px] text-neutral-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  Fast doorstep delivery
                </p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          </div>
        </div>
      </div>

      {/* Floating Top-Left Rating Badge */}
      <div className="animate-float-slow absolute top-6 left-0 bg-surface/95 backdrop-blur-md border border-border-warm rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[var(--shadow-floating)] flex items-center gap-2.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary text-dark flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-dark text-dark" />
        </div>
        <div>
          <p className="font-heading text-xs font-extrabold text-dark">
            4.9 ★ Rated
          </p>
          <p className="text-[10px] font-medium text-body">
            Seamless Experience
          </p>
        </div>
      </div>

      {/* Floating Bottom-Right Delivery Badge */}
      <div className="absolute bottom-8 right-0 bg-surface/95 backdrop-blur-md border border-border-warm rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[var(--shadow-floating)] flex items-center gap-2.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
          <Bike className="w-4 h-4" />
        </div>
        <div>
          <p className="font-heading text-xs font-extrabold text-dark">
            Quick Dispatch
          </p>
          <p className="text-[10px] font-medium text-body">
            Hot &amp; Fresh Guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

