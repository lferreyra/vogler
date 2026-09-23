import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { Home } from './pages/Home';
import { BookingFlow } from './components/booking/BookingFlow';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServicesView } from './components/views/ServicesView';
import { ServiceDetailView } from './components/views/ServiceDetailView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { FinalCTA } from './components/home/FinalCTA';
import { AuthModal } from './components/modals/AuthModal';
import { QuickQuoteModal } from './components/modals/QuickQuoteModal';

export const App: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'services':
      case 'projects':
        return <ServicesView />;
      case 'service-detail':
        return <ServiceDetailView />;
      case 'booking':
        return <BookingFlow />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'dashboard':
        return <CustomerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1B211E] selection:bg-[#12382C] selection:text-white font-sans antialiased">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Global Modals */}
      <AuthModal />
      <QuickQuoteModal />
    </div>
  );
};

export default App;
