import productsData from '@/data/products.json';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  brand: string;
  category: string;
  inStock: boolean;
  images: string[];
  rating: number;
  reviewCount: number;
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(product => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter(product => product.category === category);
}

export function getCategories(): string[] {
  const categories = getAllProducts().map(product => product.category);
  return Array.from(new Set(categories));
}
