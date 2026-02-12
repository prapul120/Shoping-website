import { useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Rankings } from '@/components/sections/Rankings';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import { SearchResults } from '@/components/sections/SearchResults';
import { ProductDetail } from '@/components/sections/ProductDetail';
import { BarcodeScanner } from '@/components/ui/custom/BarcodeScanner';
import { LoginModal } from '@/components/ui/custom/LoginModal';
import { AppProvider, useAppStore } from '@/store/AppContext';
import './App.css';

function AppContent() {
  const { currentView, setCurrentView } = useAppStore();

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentView]);

  // Render the appropriate view
  const renderContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <>
            <Navbar />
            <SearchResults />
            <Footer />
          </>
        );
      case 'product-detail':
        return (
          <>
            <Navbar />
            <ProductDetail />
            <Footer />
          </>
        );
      case 'compare':
        return (
          <>
            <Navbar />
            <SearchResults />
            <Footer />
          </>
        );
      case 'rankings':
        return (
          <>
            <Navbar />
            <Rankings />
            <Footer />
          </>
        );
      case 'home':
      default:
        return (
          <>
            <Navbar />
            <Hero />
            <HowItWorks />
            <FeaturedProducts />
            <Rankings />
            <CTASection />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {renderContent()}
      
      {/* Modals */}
      <BarcodeScanner />
      <LoginModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
