import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Send, Globe, Shield, FileText } from "lucide-react";
import { submitNewsletterEmail } from "@/firebase";
import { validateEmail } from '@/utils/emailValidation';

export default function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState('light');

  // Define pages where newsletter should be shown
  const showNewsletter = ['/about', '/blog'].includes(location.pathname);

  // Detect theme changes
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

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Case Studies', path: '/use-cases' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribed(false);
    setError("");

    if (!validateEmail(email)) {
      setError("Please provide a valid email");
      return;
    }

    const success = await submitNewsletterEmail(email);
    if (success) {
      setSubscribed(true);
      setEmail("");
    } else {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Original Premium Newsletter Section - Conditionally Rendered */}
      {showNewsletter && (
        <div className="relative px-4 py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl opacity-50"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10 p-6 md:p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Left content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                      <Send size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Stay Ahead with Insights
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1">
                        5,000+ executives subscribed
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Join industry leaders receiving exclusive insights, digital transformation strategies,
                    and early access to our cutting-edge research.
                  </p>
                </div>

                {/* Right content - Form */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-300/30 dark:border-gray-700/30 shadow-lg">
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300/50 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                      {error && (
                        <p className="text-red-500 text-xs">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!email || subscribed}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm whitespace-nowrap overflow-hidden"
                    >
                      {subscribed ? (
                        <>
                          <span className="text-green-400">✓</span>
                          Successfully Subscribed!
                        </>
                      ) : (
                        <>
                          Get Exclusive Insights
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    {subscribed && (
                      <p className="text-green-600 dark:text-green-400 text-xs text-center">
                        Welcome aboard! Check your email.
                      </p>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      By subscribing, you agree to our Privacy Policy.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Main Footer Content */}
      <div className={`container mx-auto px-4 sm:px-6 py-6 relative z-10 ${!showNewsletter ? 'pt-8' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              {/* Logo Container - Fixed to reduce blank space */}
              <div className="relative" style={{ width: "200px", height: "60px" }}>
                {/* Light Mode Logo */}
                <img
                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logo_-_Original_with_Transparent_Background_yyjwku.png"
                  alt="BDS Light Logo"
                  className="h-full w-full object-contain absolute transition-opacity duration-300"
                  style={{
                    opacity: theme === 'light' ? 1 : 0,
                    marginLeft: '-30px', // Adjust this value to fine-tune horizontal positioning
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left center' // Align logo to the left
                  }}
                />

                {/* Dark Mode Logo */}
                <img
                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logowhite_odmpw0.png"
                  alt="BDS Dark Logo"
                  className="h-full w-full object-contain absolute transition-opacity duration-300"
                  style={{
                    opacity: theme === 'dark' ? 1 : 0,
                    marginLeft: '-30px', // Same adjustment for dark mode
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left center'
                  }}
                />
              </div>
            </Link>

            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              Empowering businesses with intelligent data solutions and digital transformation strategies for a future-proof enterprise.
            </p>

            {/* Social Media - Compact */}
            <div className="flex items-center gap-2">
              {[
                { icon: <Facebook size={16} />, href: "https://www.facebook.com/businessanddatasolutions" },
                { icon: <Instagram size={16} />, href: "https://www.instagram.com/bds_businessanddatasolutions" },
                { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/business-and-data-solutions" },
                { icon: <Mail size={16} />, href: "mailto:info@businessanddatasolutions.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-800/30 p-5 transition-all duration-300">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <ChevronRight className="h-3 w-3 mr-1 text-blue-500" />
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info - Compact */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-800/30 p-5 transition-all duration-300">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <ChevronRight className="h-3 w-3 mr-1 text-green-500" />
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">London, UK E7 8LS</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">+44 (748) 787 1919</p>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">+91 (630) 447 2055</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium break-all">info@businessanddatasolutions.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                &copy; 2024 Business and Data Solutions Ltd.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                Registered in England & Wales | Company No: 15369084
              </p>
            </div>

            {/* Legal Links - Compact */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { path: '/terms', icon: <FileText size={12} />, label: 'Terms' },
                { path: '/privacy', icon: <Shield size={12} />, label: 'Privacy' },
                { path: '/cookies', label: 'Cookies' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
