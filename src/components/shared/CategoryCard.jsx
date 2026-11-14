import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({
  category,
  active = false,
  onClick,
  className = '',
}) {
  if (!category) return null;

  const { name, image, count, countLabel, tagline } = category;
  const displayCount =
    countLabel || (typeof count === 'number' ? `${count} Items` : null);

  return (
    <Card
      onClick={() => onClick?.(category)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Browse ${name} category` : undefined}
      aria-pressed={onClick ? active : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(category);
        }
      }}
      className={`group relative h-full overflow-hidden rounded-3xl bg-surface border transition-all duration-300 p-3 sm:p-4 cursor-pointer ${
        active
          ? 'border-primary ring-2 ring-primary/40 shadow-[var(--shadow-card-hover)] -translate-y-1'
          : 'border-border-warm hover:border-primary/70 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]'
      } ${className}`.trim()}
    >
      {/* Category Image Container */}
      <div className="relative h-36 sm:h-48 w-full rounded-2xl overflow-hidden bg-cream">
        {image && (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}

        {/* Subtle Dark-to-Transparent Gradient Overlay for Depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-dark/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
        />

        {/* Top-Right Item Count Badge */}
        {displayCount && (
          <div className="absolute top-2.5 right-2.5">
            <Chip
              size="small"
              label={displayCount}
              className="bg-surface/95 backdrop-blur-xs text-dark font-heading font-bold text-[11px] sm:text-xs px-1 shadow-xs border border-border-warm group-hover:bg-primary group-hover:border-primary transition-colors duration-300"
            />
          </div>
        )}
      </div>

      {/* Category Info Footer */}
      <div className="pt-3.5 pb-1 px-1 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-heading text-base sm:text-xl font-bold text-dark group-hover:text-secondary transition-colors truncate">
            {name}
          </h3>
          {tagline && (
            <p className="hidden sm:block text-xs text-body mt-0.5 truncate">
              {tagline}
            </p>
          )}
        </div>

        {/* Yellow/Orange Hover Action Indicator */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cream text-dark flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-2xs">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>

      {/* Bottom Warm Accent Line on Hover */}
      <div
        aria-hidden="true"
        className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 mt-2"
      />
    </Card>
  );
}
