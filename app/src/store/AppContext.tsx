import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, User, ViewState, SearchFilters } from '@/types';

interface AppContextType {
  // View State
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  
  // User State
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  
  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  setSearchResults: (results: Product[]) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  
  // Product State
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  compareProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  
  // Barcode State
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
  scannedBarcode: string | null;
  setScannedBarcode: (barcode: string | null) => void;
  
  // UI State
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isBarcodeModalOpen: boolean;
  setIsBarcodeModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // View State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  
  // User State
  const [user, setUser] = useState<User | null>(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  
  // Product State
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  
  // Barcode State
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  
  // UI State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  // Actions
  const setCurrentViewHandler = useCallback((view: ViewState) => {
    setCurrentView(view);
  }, []);

  const setUserHandler = useCallback((user: User | null) => {
    setUser(user);
  }, []);

  const login = useCallback((user: User) => {
    setUser(user);
    setIsLoginModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentView('home');
  }, []);

  const setSearchQueryHandler = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const setSearchResultsHandler = useCallback((results: Product[]) => {
    setSearchResults(results);
  }, []);

  const setIsSearchingHandler = useCallback((searching: boolean) => {
    setIsSearching(searching);
  }, []);

  const setFiltersHandler = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const setSelectedProduct = useCallback((product: Product | null) => {
    setSelectedProductState(product);
    if (product) {
      setCurrentView('product-detail');
    }
  }, []);

  const addToCompare = useCallback((product: Product) => {
    setCompareProducts(prev => {
      if (prev.length < 3 && !prev.find(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareProducts([]);
  }, []);

  const setIsScanningHandler = useCallback((scanning: boolean) => {
    setIsScanning(scanning);
  }, []);

  const setScannedBarcodeHandler = useCallback((barcode: string | null) => {
    setScannedBarcode(barcode);
  }, []);

  const setIsLoginModalOpenHandler = useCallback((isOpen: boolean) => {
    setIsLoginModalOpen(isOpen);
  }, []);

  const setIsBarcodeModalOpenHandler = useCallback((isOpen: boolean) => {
    setIsBarcodeModalOpen(isOpen);
  }, []);

  const value: AppContextType = {
    currentView,
    setCurrentView: setCurrentViewHandler,
    user,
    setUser: setUserHandler,
    login,
    logout,
    searchQuery,
    setSearchQuery: setSearchQueryHandler,
    searchResults,
    setSearchResults: setSearchResultsHandler,
    isSearching,
    setIsSearching: setIsSearchingHandler,
    filters,
    setFilters: setFiltersHandler,
    selectedProduct,
    setSelectedProduct,
    compareProducts,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isScanning,
    setIsScanning: setIsScanningHandler,
    scannedBarcode,
    setScannedBarcode: setScannedBarcodeHandler,
    isLoginModalOpen,
    setIsLoginModalOpen: setIsLoginModalOpenHandler,
    isBarcodeModalOpen,
    setIsBarcodeModalOpen: setIsBarcodeModalOpenHandler,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
