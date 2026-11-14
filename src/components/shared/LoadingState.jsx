import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

const SHIMMER_SX = {
  bgcolor: '#EFECE6',
  '&::after': {
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
  },
};

/**
 * 1. Reusable Image Skeleton
 */
export function ImageSkeleton({
  height = 208,
  width = '100%',
  className = 'rounded-2xl',
}) {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      width={width}
      height={height}
      sx={SHIMMER_SX}
      className={` overflow-hidden ${className}`.trim()}
    />
  );
}

/**
 * 2. Reusable Text / Content Skeleton
 */
export function TextContentSkeleton({
  lines = 3,
  showTitle = false,
  className = '',
}) {
  return (
    <div className={`space-y-2.5 w-full ${className}`.trim()} aria-hidden="true">
      {showTitle && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="55%"
          height={26}
          sx={SHIMMER_SX}
          className="rounded-lg mb-3"
        />
      )}
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1 && lines > 1;
        return (
          <Skeleton
            key={idx}
            variant="rounded"
            animation="wave"
            width={isLast ? '68%' : '100%'}
            height={16}
            sx={SHIMMER_SX}
            className="rounded-md"
          />
        );
      })}
    </div>
  );
}

/**
 * 3. Reusable Section Heading Skeleton (matches SectionHeading dimensions)
 */
export function SectionHeadingSkeleton({
  align = 'center',
  showSubtitle = true,
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      aria-hidden="true"
      className={`flex flex-col ${
        isCentered
          ? 'items-center text-center max-w-2xl mx-auto'
          : 'items-start max-w-2xl'
      } space-y-3 ${className}`.trim()}
    >
      {/* Eyebrow Pill */}
      <Skeleton
        variant="rounded"
        animation="wave"
        width={128}
        height={26}
        sx={SHIMMER_SX}
        className="rounded-full"
      />

      {/* Main Title */}
      <Skeleton
        variant="rounded"
        animation="wave"
        width={isCentered ? '75%' : '65%'}
        height={40}
        sx={SHIMMER_SX}
        className="rounded-xl min-w-[220px]"
      />

      {/* Subtitle */}
      {showSubtitle && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={isCentered ? '88%' : '80%'}
          height={18}
          sx={SHIMMER_SX}
          className="rounded-md min-w-[240px]"
        />
      )}
    </div>
  );
}

/**
 * 4. Reusable Category Card Skeleton (matches CategoryCard dimensions)
 */
export function CategoryCardSkeleton({ count = 6, className = '' }) {
  const items = Array.from({ length: count });

  if (count === 1) {
    return (
      <Card
        aria-hidden="true"
        className={`overflow-hidden rounded-3xl bg-surface border border-border-warm p-3 sm:p-4 ${className}`.trim()}
      >
        <div className="relative h-36 sm:h-48 w-full rounded-2xl overflow-hidden bg-[#F5F2EC]">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            sx={SHIMMER_SX}
          />
        </div>
        <div className="pt-3.5 pb-1 px-1 flex items-center justify-between gap-2">
          <div className="space-y-1.5 flex-1">
            <Skeleton
              variant="rounded"
              animation="wave"
              width="60%"
              height={22}
              sx={SHIMMER_SX}
              className="rounded-md"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width="80%"
              height={14}
              sx={SHIMMER_SX}
              className="hidden sm:block rounded-sm"
            />
          </div>
          <Skeleton
            variant="circular"
            animation="wave"
            width={36}
            height={36}
            sx={SHIMMER_SX}
          />
        </div>
      </Card>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ${className}`.trim()}
    >
      {items.map((_, idx) => (
        <CategoryCardSkeleton key={idx} count={1} />
      ))}
    </div>
  );
}

/**
 * 5. Reusable Food Card Skeleton (matches exact dimensions & layout of FoodCard)
 */
export function FoodCardSkeleton({ className = '' }) {
  return (
    <Card
      aria-hidden="true"
      className={`flex flex-col justify-between overflow-hidden rounded-3xl bg-surface border border-border-warm p-4 sm:p-5 ${className}`.trim()}
    >
      <div>
        {/* Image Header Container matching h-48 sm:h-52 */}
        <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 bg-[#F5F2EC]">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            sx={SHIMMER_SX}
          />
          {/* Top-left badge placeholder */}
          <div className="absolute top-3 left-3">
            <Skeleton
              variant="rounded"
              animation="wave"
              width={72}
              height={24}
              sx={{ bgcolor: 'rgba(255,255,255,0.65)' }}
              className="rounded-full"
            />
          </div>
          {/* Top-right rating pill placeholder */}
          <div className="absolute top-3 right-3">
            <Skeleton
              variant="rounded"
              animation="wave"
              width={58}
              height={24}
              sx={{ bgcolor: 'rgba(255,255,255,0.65)' }}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Category & Prep Time Meta Row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={68}
            height={14}
            sx={SHIMMER_SX}
            className="rounded-sm"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={56}
            height={14}
            sx={SHIMMER_SX}
            className="rounded-sm"
          />
        </div>

        {/* Dish Title */}
        <Skeleton
          variant="rounded"
          animation="wave"
          width="78%"
          height={24}
          sx={SHIMMER_SX}
          className="rounded-lg mb-2"
        />

        {/* 2-Line Description */}
        <div className="space-y-1.5 mt-1.5">
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={15}
            sx={SHIMMER_SX}
            className="rounded-md"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width="82%"
            height={15}
            sx={SHIMMER_SX}
            className="rounded-md"
          />
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-border-warm">
        <div className="space-y-1">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={34}
            height={12}
            sx={SHIMMER_SX}
            className="rounded-xs"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={68}
            height={24}
            sx={SHIMMER_SX}
            className="rounded-md"
          />
        </div>

        <Skeleton
          variant="rounded"
          animation="wave"
          width={118}
          height={36}
          sx={SHIMMER_SX}
          className="rounded-full"
        />
      </div>
    </Card>
  );
}

/**
 * Unified LoadingState component supporting all skeleton shimmer variants
 */
export default function LoadingState({
  variant = 'food-card',
  count = 4,
  lines = 3,
  align = 'center',
  height,
  width,
  className = '',
}) {
  if (variant === 'category') {
    return <CategoryCardSkeleton count={count} className={className} />;
  }

  if (variant === 'section-heading') {
    return <SectionHeadingSkeleton align={align} className={className} />;
  }

  if (variant === 'text') {
    return (
      <TextContentSkeleton lines={lines} showTitle className={className} />
    );
  }

  if (variant === 'image') {
    return (
      <ImageSkeleton height={height} width={width} className={className} />
    );
  }

  if (count === 1) {
    return <FoodCardSkeleton className={className} />;
  }

  return (
    <div
      role="status"
      aria-label="Loading content"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`.trim()}
    >
      {Array.from({ length: count }).map((_, index) => (
        <FoodCardSkeleton key={index} />
      ))}
    </div>
  );
}
