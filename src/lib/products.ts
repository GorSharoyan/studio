
import type { Product } from '@/lib/types';
import rawProducts from './products.json';

// The raw product data has keys in Russian. We need to map them to our Product type.
const mapProduct = (rawProduct: any, index: number): Product | null => {
  // Skip empty rows from the source data
  if (!rawProduct['Каталожный номер'] || !rawProduct['Цена']) {
    return null;
  }

  const quantity = parseInt(rawProduct['Кол-во'], 10) || 0;

  return {
    id: index + 1,
    name: rawProduct['Описание'] || 'No name',
    price: parseFloat(rawProduct['Цена']) || 0,
    country: 'China', // Default value as it's not in the source
    type: 'Lighting', // All items seem to be lamps
    imageId: `product-${(index % 20) + 1}`, // Cycle through available placeholder images
    brand: rawProduct['Бренд'] || 'Unknown Brand',
    description: `Part No: ${rawProduct['Каталожный номер']}. ${rawProduct['Описание']}`,
    comingSoon: quantity === 0,
  };
};

export const products: Product[] = rawProducts.map(mapProduct).filter((p): p is Product => p !== null);

    