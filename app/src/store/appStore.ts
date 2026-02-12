import { useState, useCallback } from 'react';
import type { Product, User, ViewState, SearchFilters } from '@/types';

interface AppState {
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

// Simple hook-based state management (no external dependencies)
export function useAppStore(): AppState {
  // View State
  const [currentView, setCurrentViewState] = useState<ViewState>('home');
  
  // User State
  const [user, setUserState] = useState<User | null>(null);
  
  // Search State
  const [searchQuery, setSearchQueryState] = useState('');
  const [searchResults, setSearchResultsState] = useState<Product[]>([]);
  const [isSearching, setIsSearchingState] = useState(false);
  const [filters, setFiltersState] = useState<SearchFilters>({});
  
  // Product State
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  
  // Barcode State
  const [isScanning, setIsScanningState] = useState(false);
  const [scannedBarcode, setScannedBarcodeState] = useState<string | null>(null);
  
  // UI State
  const [isLoginModalOpen, setIsLoginModalOpenState] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpenState] = useState(false);

  // Actions
  const setCurrentView = useCallback((view: ViewState) => {
    setCurrentViewState(view);
  }, []);

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
  }, []);

  const login = useCallback((user: User) => {
    setUserState(user);
    setIsLoginModalOpenState(false);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    setCurrentViewState('home');
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const setSearchResults = useCallback((results: Product[]) => {
    setSearchResultsState(results);
  }, []);

  const setIsSearching = useCallback((isSearching: boolean) => {
    setIsSearchingState(isSearching);
  }, []);

  const setFilters = useCallback((filters: SearchFilters) => {
    setFiltersState(filters);
  }, []);

  const setSelectedProduct = useCallback((product: Product | null) => {
    setSelectedProductState(product);
    if (product) {
      setCurrentViewState('product-detail');
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

  const setIsScanning = useCallback((isScanning: boolean) => {
    setIsScanningState(isScanning);
  }, []);

  const setScannedBarcode = useCallback((barcode: string | null) => {
    setScannedBarcodeState(barcode);
  }, []);

  const setIsLoginModalOpen = useCallback((isOpen: boolean) => {
    setIsLoginModalOpenState(isOpen);
  }, []);

  const setIsBarcodeModalOpen = useCallback((isOpen: boolean) => {
    setIsBarcodeModalOpenState(isOpen);
  }, []);

  return {
    currentView,
    setCurrentView,
    user,
    setUser,
    login,
    logout,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    filters,
    setFilters,
    selectedProduct,
    setSelectedProduct,
    compareProducts,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isScanning,
    setIsScanning,
    scannedBarcode,
    setScannedBarcode,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isBarcodeModalOpen,
    setIsBarcodeModalOpen,
  };
}

// Create a singleton instance for global state
let globalState: AppState | null = null;

export function getGlobalState(): AppState {
  if (!globalState) {
    throw new Error('Global state not initialized');
  }
  return globalState;
}

export function setGlobalState(state: AppState) {
  globalState = state;
}
