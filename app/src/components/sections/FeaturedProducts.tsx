import { ArrowRight, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/AppContext';
import { mockProducts } from '@/data/mockProducts';
import type { Product } from '@/types';

export function FeaturedProducts() {
  const { setSelectedProduct, setCurrentView, addToCompare } = useAppStore();
  
  const featuredProducts = mockProducts.slice(0, 8);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 animate-fade-in-up">
              FEATURED <span className="text-gradient">PRODUCTS</span>
            </h2>
            <p className="text-lg text-white/60 animate-fade-in-up stagger-1">
              Discover top-rated products across categories
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentView('search')}
            className="border-white/20 text-white hover:bg-white/5 group animate-fade-in-up stagger-2"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="group relative bg-dark-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/30 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button className="p-2 rounded-full bg-black/50 text-white/60 hover:text-red-400 hover:bg-black/70 transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* View Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <Button
                    onClick={() => handleProductClick(product)}
                    className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    View Details
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-black/50 border-white/20 text-white/80 text-xs backdrop-blur-sm">
                    {product.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-white/50 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-white mb-2 line-clamp-1 group-hover:text-cyan transition-colors duration-300">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-xs text-white/40">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-cyan">${product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCompare(product);
                    }}
                    className="text-xs text-white/40 hover:text-cyan transition-colors"
                  >
                    + Compare
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
