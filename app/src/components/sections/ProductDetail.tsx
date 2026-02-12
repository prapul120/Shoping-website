import { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, Check, Plus, Minus, ShoppingCart, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/AppContext';
import { getSimilarProducts, getReviewsByProductId } from '@/data/mockProducts';
import type { Product } from '@/types';

export function ProductDetail() {
  const { selectedProduct, setSelectedProduct, setCurrentView, addToCompare, compareProducts } = useAppStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const similarProducts = getSimilarProducts(selectedProduct, 4);
  const reviews = getReviewsByProductId(selectedProduct.id);
  const isInCompare = compareProducts.find(p => p.id === selectedProduct.id);

  const handleBack = () => {
    setSelectedProduct(null);
    setCurrentView('search');
  };

  const handleCompare = () => {
    if (!isInCompare) {
      addToCompare(selectedProduct);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
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
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-secondary">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isFavorite 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-black/50 text-white/60 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-black/50 text-white/60 hover:text-white transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === i ? 'border-cyan' : 'border-transparent'
                  }`}
                >
                  <img
                    src={selectedProduct.image}
                    alt={`${selectedProduct.name} ${i + 1}`}
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="border-cyan/50 text-cyan">
                  {selectedProduct.category}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/60">
                  {selectedProduct.brand}
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center gap-4">
                {renderStars(selectedProduct.rating, 'md')}
                <span className="text-white/60">{selectedProduct.rating} ({selectedProduct.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-cyan">${selectedProduct.price}</span>
              <span className={`text-sm px-3 py-1 rounded-full ${
                selectedProduct.availability === 'in_stock' 
                  ? 'bg-green-500/20 text-green-400'
                  : selectedProduct.availability === 'limited'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {selectedProduct.availability.replace('_', ' ')}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature: string, i: number) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70"
                  >
                    <Check className="w-3.5 h-3.5 text-cyan" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Barcode */}
            {selectedProduct.barcode && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <Barcode className="w-5 h-5 text-cyan" />
                <div>
                  <p className="text-xs text-white/50">Barcode</p>
                  <p className="text-sm font-mono text-white">{selectedProduct.barcode}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg font-semibold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                size="lg"
                className="flex-1 bg-cyan text-black hover:bg-cyan-light font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleCompare}
                className={`border-white/20 hover:bg-white/5 ${
                  isInCompare ? 'bg-cyan/20 border-cyan text-cyan' : 'text-white'
                }`}
              >
                {isInCompare ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added
                  </>
                ) : (
                  'Compare'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="similar" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none h-auto p-0">
              <TabsTrigger 
                value="similar"
                className="data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-6 py-4 text-white/60"
              >
                Similar Products
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-6 py-4 text-white/60"
              >
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger 
                value="compare"
                className="data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-6 py-4 text-white/60"
              >
                Compare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="similar" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group bg-dark-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/30 transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-cyan transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-white/50">{product.brand}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-cyan">${product.price}</span>
                        {renderStars(product.rating, 'sm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-dark-secondary rounded-2xl p-6 border border-white/5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-cyan-dark flex items-center justify-center text-black font-bold">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{review.userName}</p>
                            <p className="text-sm text-white/50">{review.date}</p>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-white/70">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <button className="text-sm text-white/50 hover:text-cyan transition-colors">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-white/50 hover:text-cyan transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/50">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="compare" className="mt-8">
              {compareProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-white/60 font-medium">Feature</th>
                        {compareProducts.map((p: Product) => (
                          <th key={p.id} className="text-left py-4 px-4 text-white font-medium min-w-[200px]">
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/60">Image</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4">
                            <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/60">Price</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4 text-cyan font-bold">${p.price}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/60">Rating</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4">{renderStars(p.rating)}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/60">Brand</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4 text-white">{p.brand}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/60">Category</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4 text-white">{p.category}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-white/60">Features</td>
                        {compareProducts.map((p: Product) => (
                          <td key={p.id} className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {p.features.slice(0, 3).map((f: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded text-white/70">{f}</span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/50 mb-4">No products to compare</p>
                  <Button
                    onClick={() => setCurrentView('search')}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    Browse Products
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
