import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial, className = '' }) {
  if (!testimonial) return null;

  const {
    name,
    role,
    favoriteDish,
    rating = 5,
    review,
    avatar,
  } = testimonial;

  const starCount = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));

  return (
    <Card
      className={`group relative h-full flex flex-col justify-between rounded-3xl bg-surface border border-border-warm p-6 sm:p-7 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 ${className}`.trim()}
    >
      <div>
        {/* Top Row: Star Rating & Decorative Quote Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div
            className="flex items-center gap-1"
            aria-label={`Rated ${starCount} out of 5 stars`}
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

          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-2xl bg-cream text-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-dark transition-colors duration-300"
          >
            <Quote className="w-5 h-5" />
          </div>
        </div>

        {/* Review Text */}
        <blockquote className="text-sm sm:text-base text-body leading-relaxed mb-6">
          &ldquo;{review}&rdquo;
        </blockquote>
      </div>

      {/* Customer Profile Footer */}
      <div className="pt-4 border-t border-border-warm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: 46,
              height: 46,
              border: '2px solid #FFB800',
              bgcolor: '#FFF3D6',
              color: '#222222',
              fontWeight: 700,
            }}
          >
            {name?.charAt(0)}
          </Avatar>

          <div className="min-w-0">
            <h3 className="font-heading text-base font-bold text-dark truncate">
              {name}
            </h3>
            {role && (
              <p className="text-xs font-medium text-muted truncate">{role}</p>
            )}
          </div>
        </div>

        {favoriteDish && (
          <span className="hidden sm:inline-block text-[11px] font-semibold text-secondary bg-cream px-2.5 py-1 rounded-full truncate max-w-[140px]">
            {favoriteDish}
          </span>
        )}
      </div>
    </Card>
  );
}

