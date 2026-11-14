import { UtensilsCrossed } from 'lucide-react';
import AppButton from './AppButton.jsx';

export default function EmptyState({
  icon: IconComponent = UtensilsCrossed,
  title = 'Nothing found here yet',
  description = 'Try adjusting your search or exploring another delicious category.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center bg-cream/60 border border-dashed border-border-warm rounded-3xl px-6 py-14 sm:py-16 max-w-lg mx-auto ${className}`.trim()}
    >
      <div className="w-16 h-16 rounded-2xl bg-cream-strong text-secondary flex items-center justify-center mb-5 shadow-xs">
        <IconComponent className="w-8 h-8" />
      </div>

      <h3 className="font-heading text-xl font-bold text-dark mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm sm:text-base text-body max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <AppButton variant="primary" onClick={onAction}>
          {actionLabel}
        </AppButton>
      )}
    </div>
  );
}

