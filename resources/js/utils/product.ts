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

// Product utility functions

export interface ContainerSpec {
  label: string;
  value: string;
  note: string;
}

export const getContainerSpecs = (templateType: string): ContainerSpec[] => {
  const baseSpecs: ContainerSpec[] = [
    { label: 'height', value: '', note: 'Height (cm)' },
    { label: 'width', value: '', note: 'Width (cm)' },
    { label: 'length', value: '', note: 'Length (cm)' },
    { label: 'color', value: '', note: 'Color' }
  ];
  
  const standardSpecs: ContainerSpec[] = [
    ...baseSpecs,
    { label: 'cube', value: '', note: 'Cube Capacity' },
    { label: 'max_gross_weight', value: '', note: 'Max Gross Weight (kg)' },
    { label: 'tare_weight', value: '', note: 'Tare Weight (kg)' },
    { label: 'maximum_payload', value: '', note: 'Maximum Payload (kg)' },
    { label: 'inside_cubic_capacity', value: '', note: 'Inside Cubic Capacity' },
    { label: 'racking_test_load', value: '', note: 'Racking Test Load' }
  ];
  
  const reeferSpecs: ContainerSpec[] = [
    ...baseSpecs,
    { label: 'capacity', value: '', note: 'Capacity' },
    { label: 'max_gross_weight', value: '', note: 'Max Gross Weight (kg)' },
    { label: 'tare_weight', value: '', note: 'Tare Weight (kg)' }
  ];
  
  const tankSpecs: ContainerSpec[] = [
    ...baseSpecs,
    { label: 'capacity', value: '', note: 'Capacity' },
    { label: 'max_gross_weight', value: '', note: 'Max Gross Weight (kg)' },
    { label: 'tare_weight', value: '', note: 'Tare Weight (kg)' }
  ];
  
  switch (templateType) {
    case 'standar-container':
    case 'open-top':
    case 'flat-rack':
      return standardSpecs;
    case 'reefer':
      return reeferSpecs;
    case 'tank-container':
      return tankSpecs;
    case 'custom-container':
      return baseSpecs;
    default:
      return standardSpecs;
  }
};
