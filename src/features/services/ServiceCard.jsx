import Card from '@mui/material/Card';
import { Utensils } from 'lucide-react';

export default function ServiceCard({ service, className = '' }) {
  if (!service) return null;

  const {
    step,
    title,
    description,
    icon: IconComponent = Utensils,
    highlight,
  } = service;

  return (
    <Card
      className={`group relative h-full overflow-hidden rounded-3xl bg-surface border border-border-warm p-7 sm:p-8 text-center flex flex-col items-center justify-between hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 ${className}`.trim()}
    >
      {/* Top Step Number Pill */}
      {step && (
        <span className="absolute top-5 right-5 font-heading text-xs font-extrabold text-secondary bg-cream-strong px-2.5 py-1 rounded-full">
          Step {step}
        </span>
      )}

      <div className="flex flex-col items-center">
        {/* Icon Container with Decorative Ring */}
        <div className="relative mb-6">
          <div
            aria-hidden="true"
            className="w-20 h-20 rounded-3xl bg-cream border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-xs"
          >
            <IconComponent className="w-9 h-9 text-secondary group-hover:text-dark transition-colors duration-300" />
          </div>
        </div>

        {/* Service Title */}
        <h3 className="font-heading text-xl font-bold text-dark mb-2.5 group-hover:text-secondary transition-colors">
          {title}
        </h3>

        {/* Service Description */}
        <p className="text-sm sm:text-base text-body leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      {/* Subtle Bottom Highlight Tag */}
      {highlight && (
        <div className="mt-6 pt-4 border-t border-border-warm w-full flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark/80">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {highlight}
          </span>
        </div>
      )}
    </Card>
  );
}

