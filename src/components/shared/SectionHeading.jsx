export default function SectionHeading({
  id,
  eyebrow,
  title,
  highlightedText,
  subtitle,
  align = 'center',
  action,
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col ${
        isCentered
          ? 'items-center text-center max-w-2xl mx-auto'
          : ' sm:flex-row sm:items-end sm:justify-between gap-4'
      } ${className}`.trim()}
    >
      <div className={isCentered ? 'space-y-3' : 'space-y-2.5 max-w-2xl'}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-strong text-secondary font-heading font-semibold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            {eyebrow}
          </span>
        )}

        <h2
          id={id}
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight leading-tight"
        >
          {title}{' '}
          {highlightedText && (
            <span className="text-secondary">{highlightedText}</span>
          )}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base text-body leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {!isCentered && action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

