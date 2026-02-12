import type { Product, Review, RankingProduct } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    brand: 'AudioTech',
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Features comfortable over-ear design with memory foam cushions.',
    price: 299,
    rating: 4.9,
    reviewCount: 2847,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    barcode: '1234567890123',
    features: ['Active Noise Cancellation', '30h Battery', 'Bluetooth 5.2', 'Quick Charge', 'Multi-device Connect'],
    availability: 'in_stock',
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    brand: 'TechGear',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and water resistance. Features a stunning AMOLED display and 7-day battery life.',
    price: 399,
    rating: 4.8,
    reviewCount: 1523,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    barcode: '1234567890124',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery', 'Sleep Tracking'],
    availability: 'in_stock',
  },
  {
    id: '3',
    name: 'Running Shoes Elite',
    brand: 'SportMax',
    category: 'Sports',
    description: 'Professional running shoes with advanced cushioning technology and breathable mesh upper. Designed for marathon runners and daily training.',
    price: 149,
    rating: 4.7,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    barcode: '1234567890125',
    features: ['Advanced Cushioning', 'Breathable Mesh', 'Lightweight', 'Durable Sole', 'Arch Support'],
    availability: 'in_stock',
  },
  {
    id: '4',
    name: 'Bluetooth Speaker Max',
    brand: 'SoundWave',
    category: 'Electronics',
    description: 'Portable bluetooth speaker with 360° sound, waterproof design, and 20-hour playtime. Perfect for outdoor adventures and parties.',
    price: 79,
    rating: 4.6,
    reviewCount: 2156,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
    barcode: '1234567890126',
    features: ['360° Sound', 'Waterproof IPX7', '20h Playtime', 'Bass Boost', 'Party Mode'],
    availability: 'in_stock',
  },
  {
    id: '5',
    name: 'Fitness Tracker Band',
    brand: 'FitLife',
    category: 'Electronics',
    description: 'Slim fitness tracker with step counting, calorie tracking, and sleep monitoring. Features a vibrant color display and 14-day battery.',
    price: 129,
    rating: 4.5,
    reviewCount: 3421,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop',
    barcode: '1234567890127',
    features: ['Step Counter', 'Sleep Monitor', '14-day Battery', 'Water Resistant', 'Smart Notifications'],
    availability: 'in_stock',
  },
  {
    id: '6',
    name: 'Ergonomic Laptop Stand',
    brand: 'WorkSpace',
    category: 'Accessories',
    description: 'Adjustable aluminum laptop stand for better posture and cooling. Compatible with all laptop sizes from 11 to 17 inches.',
    price: 59,
    rating: 4.8,
    reviewCount: 1876,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    barcode: '1234567890128',
    features: ['Height Adjustable', 'Aluminum Build', 'Heat Dissipation', 'Portable', 'Universal Fit'],
    availability: 'in_stock',
  },
  {
    id: '7',
    name: 'Coffee Maker Deluxe',
    brand: 'BrewMaster',
    category: 'Home',
    description: 'Programmable coffee maker with thermal carafe, auto-brew function, and customizable strength settings. Makes up to 12 cups.',
    price: 199,
    rating: 4.7,
    reviewCount: 945,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
    barcode: '1234567890129',
    features: ['Programmable', 'Thermal Carafe', '12 Cup Capacity', 'Auto-clean', 'Brew Strength Control'],
    availability: 'limited',
  },
  {
    id: '8',
    name: 'Backpack Pro',
    brand: 'TravelGear',
    category: 'Accessories',
    description: 'Water-resistant laptop backpack with USB charging port, anti-theft design, and multiple compartments. Fits up to 15.6" laptops.',
    price: 89,
    rating: 4.8,
    reviewCount: 2134,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    barcode: '1234567890130',
    features: ['USB Charging Port', 'Anti-theft', 'Water Resistant', 'Laptop Compartment', 'Ergonomic Design'],
    availability: 'in_stock',
  },
  {
    id: '9',
    name: 'Wireless Mouse Elite',
    brand: 'TechGear',
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with precision tracking, customizable buttons, and 3-month battery life. Perfect for productivity and gaming.',
    price: 49,
    rating: 4.6,
    reviewCount: 1567,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    barcode: '1234567890131',
    features: ['Ergonomic Design', 'Precision Tracking', 'Customizable Buttons', '3-month Battery', 'Multi-device'],
    availability: 'in_stock',
  },
  {
    id: '10',
    name: 'Yoga Mat Premium',
    brand: 'FitLife',
    category: 'Sports',
    description: 'Extra thick yoga mat with non-slip surface and alignment lines. Eco-friendly TPE material, perfect for all yoga styles.',
    price: 39,
    rating: 4.7,
    reviewCount: 2234,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    barcode: '1234567890132',
    features: ['Extra Thick', 'Non-slip', 'Alignment Lines', 'Eco-friendly', 'Carrying Strap'],
    availability: 'in_stock',
  },
  {
    id: '11',
    name: 'Desk Lamp LED',
    brand: 'WorkSpace',
    category: 'Home',
    description: 'Adjustable LED desk lamp with touch controls, multiple brightness levels, and USB charging port. Eye-care technology reduces strain.',
    price: 45,
    rating: 4.5,
    reviewCount: 876,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=800&h=800&fit=crop',
    barcode: '1234567890133',
    features: ['Touch Control', '5 Brightness Levels', 'USB Charging', 'Eye-care LED', 'Flexible Neck'],
    availability: 'in_stock',
  },
  {
    id: '12',
    name: 'Sunglasses Polarized',
    brand: 'StyleMax',
    category: 'Fashion',
    description: 'Classic polarized sunglasses with UV400 protection and durable metal frame. Includes premium case and cleaning cloth.',
    price: 69,
    rating: 4.6,
    reviewCount: 1123,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    barcode: '1234567890134',
    features: ['Polarized Lenses', 'UV400 Protection', 'Metal Frame', 'Premium Case', 'Scratch Resistant'],
    availability: 'in_stock',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Amazing sound quality! Best headphones I\'ve ever owned. The noise cancellation is incredible.',
    date: '2024-01-15',
    helpful: 234,
  },
  {
    id: '2',
    productId: '1',
    userName: 'John D.',
    rating: 5,
    comment: 'The barcode scanner made finding products so easy. Love the app integration!',
    date: '2024-01-12',
    helpful: 189,
  },
  {
    id: '3',
    productId: '2',
    userName: 'Emily R.',
    rating: 4,
    comment: 'Great comparison feature, helped me choose wisely. Battery life is impressive.',
    date: '2024-01-10',
    helpful: 156,
  },
  {
    id: '4',
    productId: '2',
    userName: 'Michael K.',
    rating: 5,
    comment: 'Perfect for my workouts. Tracks everything I need and looks great too!',
    date: '2024-01-08',
    helpful: 142,
  },
  {
    id: '5',
    productId: '3',
    userName: 'Lisa T.',
    rating: 5,
    comment: 'Most comfortable running shoes I\'ve ever worn. Worth every penny!',
    date: '2024-01-05',
    helpful: 98,
  },
  {
    id: '6',
    productId: '4',
    userName: 'David W.',
    rating: 4,
    comment: 'Great sound for the size. Perfect for outdoor gatherings.',
    date: '2024-01-03',
    helpful: 87,
  },
];

export function getRankings(): RankingProduct[] {
  const sorted = [...mockProducts].sort((a, b) => b.rating - a.rating);
  return sorted.slice(0, 6).map((product, index) => ({
    rank: index + 1,
    product,
    score: product.rating * 20,
  }));
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductByBarcode(barcode: string): Product | undefined {
  return mockProducts.find(p => p.barcode === barcode);
}

export function getSimilarProducts(product: Product, limit: number = 4): Product[] {
  return mockProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(p => p.category === category);
}

export function getReviewsByProductId(productId: string): Review[] {
  return mockReviews.filter(r => r.productId === productId);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

export const categories = [...new Set(mockProducts.map(p => p.category))];
export const brands = [...new Set(mockProducts.map(p => p.brand))];
