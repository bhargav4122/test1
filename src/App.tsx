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
<<<<<<< HEAD
import Industries from "./pages/Industries";
import IndustryPage from './pages/IndustryPage';
import NotFound from "./pages/NotFound";
import ParticleBackground from "./components/ParticleBackground";
import FloatingShapes from "./components/FloatingShapes";
import About from "./pages/About";
import TeamAndCareersPage from "./pages/TeamAndCareersPage";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Preloader from "@/components/Preloader/Preloader";
import BDSCanvas from "./pages/BDSCanvas";
import SparklesPreview from '@/components/sparkles-demo';
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import CookieConsent from "@/components/CookieConsent";
import BlogPage from './pages/BlogPage';
import BlogPostPage from "./pages/BlogPostPage";
import './index.css'
import { servicesDropdown, industriesDropdown } from './data/navigationData';
import ServicesOverview from "./pages/ServicesOverview";
import ServiceDetail from "./pages/ServiceDetail";
import serviceCategories from "@/data/serviceCategories";
import { serviceDetails } from "@/data/serviceDetails";
=======
import ServicesOverview from "./pages/ServicesOverview";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
>>>>>>> a149305899bad8b4a43b30f2d6c4bb5a94067081

const queryClient = new QueryClient();

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
<<<<<<< HEAD

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
=======
>>>>>>> a149305899bad8b4a43b30f2d6c4bb5a94067081

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
<<<<<<< HEAD
  const allServiceIds = getAllServiceIds();

=======
  
>>>>>>> a149305899bad8b4a43b30f2d6c4bb5a94067081
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location]);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
<<<<<<< HEAD
            <TooltipProvider>
              <ParticleBackground />
              <FloatingShapes />
              <Toaster />
              <Sonner />
              <ChatBot />
              <Navbar />
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/service/:serviceId" element={<ServiceRedirect />} />
                <Route path="/service-detail/:serviceId" element={
                  <ErrorBoundary>
                    <ServiceDetail />
                  </ErrorBoundary>
                } />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:industryId" element={
                  <ErrorBoundary>
                    <IndustryPage />
                  </ErrorBoundary>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/teamandcareerspage" element={<TeamAndCareersPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={
                  <ErrorBoundary>
                    <BlogPostPage />
                  </ErrorBoundary>
                } />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/canvas" element={<BDSCanvas />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <CookieConsent />
            </TooltipProvider>
=======
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
>>>>>>> a149305899bad8b4a43b30f2d6c4bb5a94067081
          </ThemeProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
<<<<<<< HEAD
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <SparklesPreview />
          </div>
        ) : (
          <AppContent />
        )}
=======
      <Toaster />
      <AnimatePresence mode="wait">
        <AppContent />
>>>>>>> a149305899bad8b4a43b30f2d6c4bb5a94067081
      </AnimatePresence>
    </BrowserRouter>
  );
}
