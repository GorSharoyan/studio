
import type { Product } from '@/lib/types';
import rawProducts from './products.json';

// The raw product data has keys in Russian. We need to map them to our Product type.
const mapProduct = (rawProduct: any, index: number): Product | null => {
  // Skip empty rows from the source data
  if (!rawProduct['Каталожный номер'] || !rawProduct['Цена']) {
    return null;
  }

  return {
    id: index + 1,
    name: rawProduct['Описание'] || 'No name',
    price: parseFloat(rawProduct['Цена']) || 0,
    country: 'China', // Default value as it's not in the source
    type: 'Lighting', // All items seem to be lamps
    imageId: `product-${(index % 20) + 1}`, // Cycle through available placeholder images
    brand: rawProduct['Бренд'] || 'Unknown Brand',
    description: `Part No: ${rawProduct['Каталожный номер']}. ${rawProduct['Описание']}`,
    comingSoon: false,
  };
};

const existingProducts: Product[] = rawProducts.map(mapProduct).filter((p): p is Product => p !== null);

const comingSoonProducts: Product[] = [
    {
        id: 1001,
        name: "Performance Exhaust Systems",
        price: 0,
        country: "Germany",
        type: "Performance",
        imageId: "product-16",
        brand: "FutureBrand",
        description: "High-performance exhaust systems for various models. Coming Soon!",
        comingSoon: true,
    },
    {
        id: 1002,
        name: "Advanced LED Headlight Kits",
        price: 0,
        country: "Japan",
        type: "Lighting",
        imageId: "product-6",
        brand: "FutureBrand",
        description: "Next-generation adaptive LED headlight kits. Coming Soon!",
        comingSoon: true,
    },
    {
        id: 1003,
        name: "Turbocharger Upgrade Kits",
        price: 0,
        country: "USA",
        type: "Performance",
        imageId: "product-10",
        brand: "FutureBrand",
        description: "Complete turbocharger upgrade kits for enhanced power. Coming Soon!",
        comingSoon: true,
    }
];

export const products: Product[] = [...existingProducts, ...comingSoonProducts];
