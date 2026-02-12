export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  barcode?: string;
  features: string[];
  availability: 'in_stock' | 'out_of_stock' | 'limited';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isGuest: boolean;
}

export interface ComparisonItem {
  product: Product;
  isWinner?: boolean;
}

export interface RankingProduct {
  rank: number;
  product: Product;
  score: number;
}

export type ViewState = 
  | 'home' 
  | 'search' 
  | 'product-detail' 
  | 'compare' 
  | 'rankings' 
  | 'login';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brand?: string;
}
