import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route, 
  useLocation, 
  Navigate,
  useParams
} from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import ServicesOverview from "./pages/ServicesOverview";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Error caught by boundary:', error.error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <div className="p-4 text-center">Failed to load this page. Please try navigating from the homepage.</div>;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location]);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesOverview />} />
              <Route 
                path="/service-detail/:serviceId" 
                element={
                  <ErrorBoundary>
                    <ServiceDetail />
                  </ErrorBoundary>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster />
      <AnimatePresence mode="wait">
        <AppContent />
      </AnimatePresence>
    </BrowserRouter>
  );
}
