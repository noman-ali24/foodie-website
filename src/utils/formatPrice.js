export const CURRENCY_CONFIG = {
  locale: 'en-PK',
  currency: 'PKR',
  customSymbol: 'Rs.',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

export function formatPrice(amount, overrides = {}) {
  const numericAmount = Number(amount) || 0;
  const config = { ...CURRENCY_CONFIG, ...overrides };

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(numericAmount);

  if (config.currency === 'PKR' && config.customSymbol) {
    return formatted.replace(/^PKR\s?|^Rs\.?\s?/i, `${config.customSymbol} `);
  }

  return formatted;
}
