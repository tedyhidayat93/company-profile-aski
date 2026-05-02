interface ProductSellingStatus {
  is_for_sell: boolean;
  is_rent: boolean;
}

/**
 * Get the display text for product availability type
 * @param product - Product object with is_for_sell and is_rent properties
 * @returns String indicating if product is for sale, rent, or both
 */
export function getProductTypeText(product: ProductSellingStatus): string {
  if (product.is_for_sell && product.is_rent) {
    return 'Jual & Sewa';
  } else if (product.is_for_sell) {
    return 'Dijual';
  } else if (product.is_rent) {
    return 'Disewakan';
  }
  return 'Disewakan';
}
