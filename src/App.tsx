import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom';
import { Search, Menu, X, Building2, Mail, Phone, MapPin, ChevronRight, Wrench, Zap, Brain, Shield, Cloud, Database, Cpu, Home } from 'lucide-react';
import { servicesDropdown, industriesDropdown } from './data/navigationData';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import serviceCategories from "@/data/serviceCategories";
import { serviceDetails } from "@/data/serviceDetails";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import SparklesPreview from '@/components/sparkles-demo';
import ParticleBackground from "./components/ParticleBackground";
import FloatingShapes from "./components/FloatingShapes";
import CookieConsent from "@/components/CookieConsent";
import Layout from "@/components/layout/Layout";

import UnsubscribePage from "./pages/UnsubscribePage";
import AdminSubscribers from "./pages/AdminSubscribers";

const Index = React.lazy(() => import("./pages/Index"));
const ServicesOverview = React.lazy(() => import("./pages/ServicesOverview"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail"));
const Industries = React.lazy(() => import("./pages/Industries"));
const IndustryPage = React.lazy(() => import('./pages/IndustryPage'));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const About = React.lazy(() => import("./pages/About"));
const TeamAndCareersPage = React.lazy(() => import("./pages/TeamAndCareersPage"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Consultation = React.lazy(() => import("./pages/Consultation"));
const BlogPage = React.lazy(() => import('./pages/BlogPage.jsx'));
const BlogPostPage = React.lazy(() => import("./pages/BlogPostPage"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Cookies = React.lazy(() => import("./pages/Cookies"));
const BDSCanvas = React.lazy(() => import("./pages/BDSCanvas"));
const Care = React.lazy(() => import("@/pages/Care.tsx"));
const BookingConfirmation = React.lazy(() => import('./pages/BookingConfirmation'));
const Adminpage = React.lazy(() => import('./pages/Adminpage'));
const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage"));
const UseCasesPage = React.lazy(() => import("./pages/UseCasesPage"));


const queryClient = new QueryClient();
const CustomRouter = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter
      window={window}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {children}
    </BrowserRouter>
  );
};
const ServiceRedirect = () => {
  const location = useLocation();
  const path = location.pathname;
  const serviceId = path.split('/service/')[1];
  console.log(`Redirecting from old URL pattern: ${path} to new URL pattern: /service-detail/${serviceId}`);
  return <Navigate to={`/service-detail/${serviceId}`} replace />;
};

const getAllServiceIds = () => {
  const categoryIds = serviceCategories.map(category => category.id);
  const detailIds = Object.keys(serviceDetails);
  return [...new Set([...categoryIds, ...detailIds])];
};

const AppContent = () => {
  const allServiceIds = getAllServiceIds();
  // console.log("All available service IDs:", allServiceIds);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-black">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <ParticleBackground />
              <FloatingShapes />
              <Toaster />
              <Sonner />
              <CustomRouter>
                <Navbar />
                <ChatBot />
                <WhatsAppButton />
                <Layout>
                  <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen"><SparklesPreview /></div>}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/services" element={<ServicesOverview />} />
                      <Route path="/service" element={<ServicesOverview />} />
                      <Route path="/service/:serviceId" element={<ServiceRedirect />} />
                      <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
                      <Route path="/industries" element={<Industries />} />
                      <Route path="/industries/:industryId" element={<IndustryPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/teamandcareerspage" element={<TeamAndCareersPage />} />
                      <Route path="/testimonials" element={<TestimonialsPage />} />
                      <Route path="/use-cases" element={<UseCasesPage />} />

                      <Route path="/contact" element={<Contact />} />
                      <Route path="/consultation" element={<Consultation />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:id" element={<BlogPostPage />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/cookies" element={<Cookies />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/bdscanvas" element={<BDSCanvas />} />
                      <Route path="/care" element={<Care />} />
                      <Route path="/unsubscribe" element={<UnsubscribePage />} />
                      <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
                      <Route path="/adminpage" element={<Adminpage />} />
                      <Route path="/adminsubscribers" element={<AdminSubscribers />} />
                    </Routes>
                  </React.Suspense>
                </Layout>
                <Footer />
              </CustomRouter>
              <CookieConsent />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <SparklesPreview />
          </div>
        ) : (
          <AppContent />
        )}
      </AnimatePresence>
    </>
  );
}
