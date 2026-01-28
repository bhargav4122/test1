import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Search, Building2, Home as HomeIcon, Wrench, Shield, Zap, Brain, Mail, NewspaperIcon, Star, Rocket } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/useWindowSize";
import { servicesDropdown, industriesDropdown } from "@/data/navigationData";
import NavDropdown from "@/components/NavDropdown";
import { DropdownItem } from "@/types/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const mobileMenuItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'About', path: '/about', icon: <Brain className="h-5 w-5" /> },
    { name: 'Services', path: '/services', icon: <Wrench className="h-5 w-5" /> },
    { name: 'Industries', path: '/industries', icon: <Building2 className="h-5 w-5" /> },
    { name: 'Careers', path: '/care', icon: <Zap className="h-5 w-5" /> },
    { name: 'Testimonials', path: '/testimonials', icon: <Star className="h-5 w-5" /> },
    { name: 'Use Cases', path: '/use-cases', icon: <Rocket className="h-5 w-5" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="h-5 w-5" /> },
    { name: 'Blog', path: '/blog', icon: <NewspaperIcon className="h-5 w-5" /> }
  ];

  return (
    <>
      <header
        className={cn(
          "fixed  left-0 right-0 pl-10  w-full z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? theme === "dark"
              ? "bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg"
              : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 md:h-20 items-center justify-between">
            {/* Logo - Non-clickable version */}
            <div className="flex items-center space-x-3">
              <div className="h-16 w-32 md:h-20 md:w-40 lg:h-24 lg:w-48 xl:h-28 xl:w-56 relative">
                {/* Light Mode Logo */}
                <img

                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logo_-_Original_with_Transparent_Background_yyjwku.png"
                  alt="BDS Light Logo"
                  className={`h-full w-full object-contain absolute transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    display: theme === 'light' ? 'block' : 'none',
                    marginLeft: '-30px',
                    maxWidth: '100%',
                    maxHeight: '100%'
                    // clipPath: 'inset(30px 0 0 0)'
                  }}
                />

                {/* Dark Mode Logo */}
                <img
                  src="https://res.cloudinary.com/dsf4d41i8/image/upload/w_300,f_auto,q_auto/v1753052964/BDS_Logowhite_odmpw0.png"

                  alt="BDS Dark Logo"
                  className={`h-full w-full object-contain absolute transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    display: theme === 'dark' ? 'block' : 'none',
                    marginLeft: '-30px',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 flex items-center gap-1 py-2 px-3 rounded-md",
                  location.pathname === "/"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>

              <Link
                to="/about"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/about"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                About
              </Link>


              <NavDropdown
                title="Services"
                items={servicesDropdown as DropdownItem[]}
                titleClassName={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-gray-900 hover:text-primary hover:bg-primary/5"
                )}
              />

              <NavDropdown
                title="Industries"
                items={industriesDropdown as DropdownItem[]}
                titleClassName={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-gray-900 hover:text-primary hover:bg-primary/5"
                )}
              />
              {/*
              <Link
                to="/teamandcareerspage"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/teamandcareerspage"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Team & Careers
              </Link>*/}

              <Link
                to="/contact"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/contact"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Contact
              </Link>

              <Link
                to="/blog"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/blog"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Blog
              </Link>


              {/*
              <Link
                to="/care"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/blog"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                careers
              </Link>


              <Link
                to="/email-test"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/email-test"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                email-test
              </Link>



              <Link
                to="/care"
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/blog"
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-primary/10 text-primary"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Care
              </Link>

*/}



              {/* Consultation Button - Desktop */}
              <div className="relative ml-2">
                <Button
                  asChild
                  className={cn(
                    "relative rounded-lg font-bold transition-all duration-300",
                    "hover:scale-[1.03] transform-gpu",
                    "px-4 py-2 h-auto",
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
                      : "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500"
                  )}
                >
                  <Link to="/consultation" className="flex items-center justify-center gap-1">
                    <span className="text-sm font-medium">Consultation</span>
                    <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs font-bold bg-yellow-500 text-white">
                      FREE!
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "rounded-full w-9 h-9 flex items-center justify-center ml-1",
                  theme === "dark"
                    ? "hover:bg-white/10 text-yellow-300"
                    : "hover:bg-primary/10 text-primary"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                className={`hover:text-blue-400 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu Content */}
          <div className={cn(
            "absolute top-0 right-0 h-full w-4/5 max-w-sm overflow-y-auto pt-20", // Added pt-20 for padding top
            "transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
            theme === "dark"
              ? "bg-gray-900/95 border-l border-white/10"
              : "bg-white/95 border-l border-gray-200 shadow-xl"
          )}>
            <div className="flex justify-between items-center p-4 border-b absolute top-0 left-0 right-0">
              <h3 className={cn(
                "text-lg font-semibold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Menu
              </h3>
              <button
                className={cn(
                  "p-2 rounded-full",
                  theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-gray-100"
                )}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  setIsMenuOpen(false);
                }}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-2 mt-4"> {/* Added mt-4 for margin top */}
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    location.pathname === item.path
                      ? theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-primary/10 text-primary"
                      : theme === "dark"
                        ? "text-white hover:bg-white/5"
                        : "text-gray-800 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-base font-medium">{item.name}</span>
                </Link>
              ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  // Keep menu open after theme toggle on mobile
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all",
                  theme === "dark"
                    ? "text-white hover:bg-white/5"
                    : "text-gray-800 hover:bg-gray-100"
                )}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span className="text-base font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span className="text-base font-medium">Dark Mode</span>
                  </>
                )}
              </button>

              {/* Consultation Button - Mobile */}
              <div className="pt-4">
                <Button
                  size="lg"
                  className={cn(
                    "w-full transition-all duration-300",
                    "flex flex-col items-center justify-center py-3",
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white"
                  )}
                  asChild
                >
                  <Link
                    to="/consultation"
                    onClick={() => setIsMenuOpen(false)}
                    className="relative"
                  >
                    <span className="font-semibold">Free Consultation</span>
                    <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs font-bold bg-yellow-500 text-white">
                      FREE!
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
