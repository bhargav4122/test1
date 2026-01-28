import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin,
  Shield, FileText, Lock, Globe, ArrowUp,
  Users, Sparkles, Building, Award, Bell, CheckCircle,
  Send, Briefcase, Target, BarChart
} from "lucide-react";
import {
  auth,
  provider,
  signInWithPopup,
  db,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  push,
  get
} from "@/firebase";
import { motion } from "framer-motion";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [googleSubscribed, setGoogleSubscribed] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [theme, setTheme] = useState('light');
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const subscribersRef = ref(db, 'newsletterSubscribers');
        const emailQuery = query(
          subscribersRef,
          orderByChild('email'),
          equalTo(user.email)
        );

        try {
          const snapshot = await get(emailQuery);
          if (snapshot.exists()) {
            setGoogleSubscribed(true);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
    };

    checkSubscriptionStatus();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkSubscriptionStatus();
      } else {
        setGoogleSubscribed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyLinks = [
    { name: 'About Us', path: '/about', icon: <Users size={14} /> },
    { name: 'Services', path: '/services', icon: <Sparkles size={14} /> },
    { name: 'Case Studies', path: '/use-cases', icon: <Award size={14} /> },
  ];

  const resourceLinks = [
    { name: 'Industries', path: '/industries', icon: <Building size={14} /> },
    { name: 'Blog', path: '/blog', icon: <FileText size={14} /> },
    { name: 'Contact Sales', path: '/contact', icon: <Phone size={14} /> },
  ];

  const handleGoogleSubscribe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingGoogle(true);
    setGoogleError('');
    setGoogleSubscribed(false);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const subscribersRef = ref(db, 'newsletterSubscribers');
      const emailQuery = query(
        subscribersRef,
        orderByChild('email'),
        equalTo(user.email)
      );

      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        setGoogleSubscribed(true);
        setGoogleError('Already subscribed');
        setLoadingGoogle(false);
        return;
      }

      const subscriberData = {
        email: user.email,
        userId: user.uid,
        name: user.displayName || user.email.split('@')[0],
        profilePicture: user.photoURL || null,
        timestamp: Date.now(),
        provider: 'google',
        source: 'footer_subscription',
      };

      const newSubscriberRef = push(subscribersRef);
      await set(newSubscriberRef, subscriberData);

      setGoogleSubscribed(true);
      setGoogleError('Subscribed successfully!');

      try {
        const formData = new URLSearchParams();
        formData.append('formType', 'newsletter_google_footer');
        formData.append('customerEmail', user.email);
        formData.append('customerName', user.displayName || 'Google User');
        formData.append('userId', user.uid);
        formData.append('firebaseId', newSubscriberRef.key);
        formData.append('timestamp', new Date().toISOString());
        formData.append('source', 'footer_google_signup');
        formData.append('verified', 'true');

        await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3c1dy1/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });
      } catch (zapierError) {
        console.log('Zapier logging failed:', zapierError);
      }

    } catch (error) {
      console.error('Google Sign-In Error:', error.code, error.message);

      if (error.code === 'auth/popup-closed-by-user') {
        setGoogleError('Sign-in cancelled');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setGoogleError('Email already associated');
      } else if (error.code === 'auth/popup-blocked') {
        setGoogleError('Popup blocked');
      } else {
        setGoogleError('Sign-in failed');
      }

      setGoogleSubscribed(false);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      {/* Main Footer Content - 5 Blocks Layout */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8"
        >
          {/* Brand & Description - Span 3 */}
          <div className="md:col-span-3 space-y-4">
            <Link to="/" className="inline-block">
              <div className="relative" style={{ width: "180px", height: "50px" }}>
                <img
                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logo_-_Original_with_Transparent_Background_yyjwku.png"
                  alt="BDS Light Logo"
                  className="h-full w-full object-contain absolute"
                  style={{
                    opacity: theme === 'light' ? 1 : 0,
                  }}
                />
                <img
                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logowhite_odmpw0.png"
                  alt="BDS Dark Logo"
                  className="h-full w-full object-contain absolute"
                  style={{
                    opacity: theme === 'dark' ? 1 : 0,
                  }}
                />
              </div>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Transforming enterprises through intelligent data solutions and AI innovation.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/business-and-data-solutions", label: "LinkedIn" },
                { icon: <Facebook size={16} />, href: "https://www.facebook.com/businessanddatasolutions", label: "Facebook" },
                { icon: <Instagram size={16} />, href: "https://www.instagram.com/bds_businessanddatasolutions", label: "Instagram" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links - Span 2 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="opacity-70">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links - Span 2 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart size={16} className="text-green-600 dark:text-green-400" />
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="opacity-70">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Span 2 */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target size={16} className="text-red-600 dark:text-red-400" />
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">London, UK, E7 8LS</span>
                </div>

                <div className="flex items-start gap-2">
                  <Phone size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">+44 (748) 787 1919</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+91 (630) 447 2055</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:info@businessanddatasolutions.com"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    info@businessanddatasolutions.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter - Span 3 (Compact) */}
          <div className="md:col-span-3">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
                  <Send size={14} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Newsletter</h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get AI insights and updates
              </p>

              <button
                onClick={handleGoogleSubscribe}
                disabled={loadingGoogle || googleSubscribed}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${googleSubscribed
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-sm hover:shadow'
                  } ${loadingGoogle ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loadingGoogle ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : googleSubscribed ? (
                  <>
                    <CheckCircle size={14} />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    Subscribe
                  </>
                )}
              </button>

              {googleError && (
                <p className={`text-xs mt-2 ${googleError.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {googleError}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Empty spacer for WhatsApp button on left */}
            <div className="hidden md:block w-[60px]"></div>

            {/* Copyright - Centered */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; 2024 Business and Data Solutions Ltd.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Registered in England & Wales
              </p>
            </div>

            {/* Legal Links - Right side */}
            <div className="flex items-center gap-6">
              {[
                { path: '/terms', label: 'Terms' },
                { path: '/privacy', label: 'Privacy' },
                { path: '/cookies', label: 'Cookies' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Bottom Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        onClick={handleBackToTop}
        type="button"
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
