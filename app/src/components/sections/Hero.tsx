import { useState, useEffect, useRef } from 'react';
import { Search, Camera, Scan, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/AppContext';
import { searchProducts } from '@/data/mockProducts';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { 
    setSearchResults, 
    setIsSearching, 
    setCurrentView, 
    setIsBarcodeModalOpen
  } = useAppStore();

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setCurrentView('search');
    }, 500);
  };

  const handleBarcodeScan = () => {
    setIsBarcodeModalOpen(true);
  };

  const featuredSearches = ['Headphones', 'Smart Watch', 'Running Shoes', 'Coffee Maker'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${6 + particle.delay}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm text-white/70">Discover products with ease</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight animate-fade-in-up stagger-1">
              DISCOVER
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight animate-fade-in-up stagger-2">
              <span className="text-gradient">PRODUCTS</span>
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight animate-fade-in-up stagger-3">
              WITH EASE
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto animate-fade-in-up stagger-4">
            Search by name or scan barcodes to find detailed product information, 
            compare options, and make informed decisions.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className={`relative max-w-2xl mx-auto animate-fade-in-up stagger-5 transition-all duration-500 ${
              isFocused ? 'scale-[1.02]' : ''
            }`}
          >
            <div 
              className={`relative flex items-center gap-2 p-2 rounded-2xl bg-dark-secondary border transition-all duration-300 ${
                isFocused 
                  ? 'border-cyan/50 shadow-glow' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <Search className={`w-5 h-5 ml-3 transition-colors duration-300 ${isFocused ? 'text-cyan' : 'text-white/40'}`} />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type product name or scan barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <button
                type="button"
                onClick={handleBarcodeScan}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-cyan transition-all duration-300"
                title="Scan Barcode"
              >
                <Camera className="w-5 h-5" />
              </button>
              <Button
                type="submit"
                className="bg-cyan text-black hover:bg-cyan-light font-semibold px-6 rounded-xl transition-all duration-300"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up stagger-6">
            <span className="text-sm text-white/40">Popular:</span>
            {featuredSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  inputRef.current?.focus();
                }}
                className="px-3 py-1 text-sm text-white/60 hover:text-cyan bg-white/5 hover:bg-cyan/10 rounded-full transition-all duration-300"
              >
                {term}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-6">
            <Button
              onClick={() => handleSearch()}
              size="lg"
              className="bg-cyan text-black hover:bg-cyan-light font-semibold px-8 py-6 rounded-xl text-base group transition-all duration-300"
            >
              Start Searching
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={handleBarcodeScan}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5 px-8 py-6 rounded-xl text-base group transition-all duration-300"
            >
              <Scan className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Scan Barcode
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
