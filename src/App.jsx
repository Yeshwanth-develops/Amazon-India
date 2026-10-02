import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { CategoryDrawer } from './components/CategoryDrawer';
import { HomeView } from './components/HomeView';
import { DealsView } from './components/DealsView';
import { WishlistView } from './components/WishlistView';
import { SearchResultsView } from './components/SearchResultsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AuthModal } from './components/AuthModal';
import { PrimeModal } from './components/PrimeModal';
import { AddressModal } from './components/AddressModal';
import { SpinAndWinModal } from './components/SpinAndWinModal';
import { AIAssistant } from './components/AIAssistant';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const MainAppContent = () => {
  const { currentView } = useShop();

  return (
    <div className="app-container">
      {/* Sticky Header with Great Indian Festival Notice */}
      <Navbar />

      {/* Slide-out Category Drawer */}
      <CategoryDrawer />

      {/* Main Dynamic View */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && <HomeView />}
        {currentView === 'deals' && <DealsView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'search' && <SearchResultsView />}
      </main>

      {/* Interactive Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderHistoryModal />
      <AuthModal />
      <PrimeModal />
      <AddressModal />
      <SpinAndWinModal />

      {/* Rufus AI India Smart Shopping Genie */}
      <AIAssistant />

      {/* Toast Feedback */}
      <Toast />

      {/* Multi-column Indian Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
