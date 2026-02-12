import { useEffect } from 'react';
import { Search, X, ArrowLeft, Barcode, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/AppContext';
import { searchProducts, categories } from '@/data/mockProducts';
import type { Product } from '@/types';

export function SearchResults() {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    setSearchResults, 
    isSearching,
    setIsSearching,
    setCurrentView,
    setSelectedProduct,
    filters,
    setFilters,
    setIsBarcodeModalOpen
  } = useAppStore();

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timeout = setTimeout(() => {
        const results = searchProducts(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchQuery, setSearchResults, setIsSearching]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentView('home');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
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
    <section className="min-h-screen bg-black pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={clearSearch}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Search Results</h1>
            <p className="text-white/50">
              {searchResults.length} products found for &quot;{searchQuery}&quot;
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-12 pr-10 py-6 bg-dark-secondary border-white/10 text-white placeholder:text-white/40 focus:border-cyan rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsBarcodeModalOpen(true)}
            className="px-4 py-3 rounded-xl bg-dark-secondary border border-white/10 text-white/60 hover:text-cyan hover:border-cyan/50 transition-all duration-300"
          >
            <Barcode className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge 
            variant="outline" 
            className={`cursor-pointer transition-all duration-300 ${
              !filters.category ? 'bg-cyan/20 border-cyan text-cyan' : 'border-white/20 text-white/60 hover:text-white'
            }`}
            onClick={() => setFilters({ ...filters, category: undefined })}
          >
            All Categories
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className={`cursor-pointer transition-all duration-300 ${
                filters.category === cat ? 'bg-cyan/20 border-cyan text-cyan' : 'border-white/20 text-white/60 hover:text-white'
              }`}
              onClick={() => setFilters({ ...filters, category: cat })}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Results Grid */}
        {isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-dark-secondary rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                  <div className="h-6 bg-white/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product: Product, index: number) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group bg-dark-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/30 transition-all duration-500 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-cyan text-black hover:bg-cyan-light text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs border-white/20 text-white/60">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-cyan transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-2">{product.brand}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-white/40">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-cyan">${product.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.availability === 'in_stock' 
                        ? 'bg-green-500/20 text-green-400'
                        : product.availability === 'limited'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.availability.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/50 mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
