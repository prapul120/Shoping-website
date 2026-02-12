import { Trophy, Star, TrendingUp, Medal, Crown, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/AppContext';
import { getRankings } from '@/data/mockProducts';
import type { Product } from '@/types';

export function Rankings() {
  const { setSelectedProduct } = useAppStore();
  const rankings = getRankings();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-white/40">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-br from-gray-400/20 to-gray-400/5 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-br from-amber-600/20 to-amber-600/5 border-amber-600/30';
      default:
        return 'bg-dark-secondary border-white/5';
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6 animate-fade-in-up">
            <Trophy className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan">Top Rated</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 animate-fade-in-up stagger-1">
            TOP RANKED <span className="text-gradient">PRODUCTS</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto animate-fade-in-up stagger-2">
            Based on user ratings, reviews, and popularity
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 mb-16">
          {rankings.slice(0, 3).map((item) => {
            const isFirst = item.rank === 1;
            const orderClass = isFirst ? 'md:order-2' : item.rank === 2 ? 'md:order-1' : 'md:order-3';
            const heightClass = isFirst ? 'md:h-[420px]' : 'md:h-[360px]';
            
            return (
              <div
                key={item.product.id}
                onClick={() => handleProductClick(item.product)}
                className={`w-full md:w-80 ${orderClass} ${heightClass} cursor-pointer group animate-fade-in-up`}
                style={{ animationDelay: `${item.rank * 0.15}s` }}
              >
                <div className={`relative h-full rounded-3xl border-2 overflow-hidden transition-all duration-500 hover:scale-[1.02] ${getRankStyle(item.rank)}`}>
                  {/* Rank Badge */}
                  <div className={`absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                    isFirst ? 'bg-yellow-500/20' : item.rank === 2 ? 'bg-gray-400/20' : 'bg-amber-600/20'
                  }`}>
                    {getRankIcon(item.rank)}
                  </div>

                  {/* Score Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${
                      isFirst ? 'bg-yellow-500/20 text-yellow-400' : 
                      item.rank === 2 ? 'bg-gray-400/20 text-gray-400' : 
                      'bg-amber-600/20 text-amber-400'
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {item.score.toFixed(0)} pts
                    </Badge>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-white/50 mb-1">{item.product.brand}</p>
                    <h3 className="font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan transition-colors">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(item.product.rating)}
                      <span className="text-sm text-white/60">{item.product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cyan">${item.product.price}</span>
                      <span className="text-xs text-white/40">{item.product.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Rankings List */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan" />
            More Top Products
          </h3>
          
          <div className="space-y-4">
            {rankings.slice(3).map((item) => (
              <div
                key={item.product.id}
                onClick={() => handleProductClick(item.product)}
                className="group flex items-center gap-4 p-4 bg-dark-secondary rounded-2xl border border-white/5 hover:border-cyan/30 transition-all duration-300 cursor-pointer animate-fade-in-up"
              >
                {/* Rank */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white/40">#{item.rank}</span>
                </div>

                {/* Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/50">{item.product.brand}</p>
                  <h4 className="font-semibold text-white truncate group-hover:text-cyan transition-colors">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(item.product.rating)}
                    <span className="text-sm text-white/60">{item.product.rating}</span>
                  </div>
                </div>

                {/* Price & Score */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-cyan">${item.product.price}</p>
                  <p className="text-xs text-white/40">{item.score.toFixed(0)} pts</p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-cyan group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
