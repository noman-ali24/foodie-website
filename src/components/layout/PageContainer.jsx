export default function PageContainer({
  children,
  as: Component = 'div',
  className = '',
  ...rest
}) {
  return (
    <Component
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}

