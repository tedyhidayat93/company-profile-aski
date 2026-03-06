// Utility functions for currency formatting
export const formatCurrencyInput = (value: string): string => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/[^\d]/g, '');
  
  if (cleanValue === '') return '';
  
  // Convert to number and format with Indonesian locale (without currency symbol for input)
  const number = parseFloat(cleanValue);
  if (isNaN(number)) return '';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(number);
};

export const parseCurrencyInput = (formattedValue: string): number => {
  // Remove all non-digit characters to get the raw number
  const cleanValue = formattedValue.replace(/[^\d]/g, '');
  return cleanValue === '' ? 0 : parseFloat(cleanValue);
};

export const formatCurrencyDisplay = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
};

export const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined || isNaN(price)) {
    return '-';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
