
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; 
import { Menu, X, Sun, Moon, Search, Building2, Home as HomeIcon, Wrench, Shield, Zap, Brain, Mail, Cpu } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { servicesDropdown, industriesDropdown } from "@/data/navigationData"; 
import NavDropdown from "@/components/NavDropdown";
import { DropdownItem } from "@/types/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create array of mobile menu items with proper typing
  const mobileMenuItems = [
    {name: 'Home', path: '/', icon: <HomeIcon className="h-5 w-5" />},
    {name: 'Services', path: '/services', icon: <Wrench className="h-5 w-5" />},
    {name: 'Industries', path: '/industries', icon: <Building2 className="h-5 w-5" />},
    {name: 'Team', path: '/team', icon: <Shield className="h-5 w-5" />},
    {name: 'Careers', path: '/careers', icon: <Zap className="h-5 w-5" />},
    {name: 'About', path: '/about', icon: <Brain className="h-5 w-5" />},
    {name: 'Contact', path: '/contact', icon: <Mail className="h-5 w-5" />},
    {name: 'Tools', path: '/tools', icon: <Cpu className="h-5 w-5" />}
    
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 w-full z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? theme === "dark" 
              ? "bg-black backdrop-blur-xl border-b border-gray-800 shadow-lg shadow-black/20" 
              : "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">

<Link to="/" className="flex items-center space-x-3 group">
  {/* Dual-theme Logo Container - Now Larger */}
<div className="h-40 w-40 md:h-52 md:w-52 lg:h-64 lg:w-64 flex-shrink-0 relative">
    {/* Light Mode Logo */}
    <img 
      src="/BDS Logo - Original with Transparent Background (1).svg" 
      alt="BDS Light Logo" 
      className={`h-full w-full object-contain absolute transition-opacity duration-300 ${
        theme === 'light' ? 'opacity-100' : 'opacity-0'
      }`}

       style={{
            display: theme === 'light' ? 'block' : 'none',
            marginLeft:-50,
            lineHeight: 0,
            clipPath: 'inset(30px 0 0 0)' // Crop 30px from top
          }}
    />
    
    {/* Dark Mode Logo */}
    <img 
      src="/BDS Logo - Original with Transparent Background.svg" 
      alt="BDS Dark Logo" 
      className={`h-full w-full object-contain absolute transition-opacity duration-300 ${
        theme === 'dark' ? 'opacity-100' : 'opacity-0'
      }`}

        style={{
            display: theme === 'dark' ? 'block' : 'none',
            marginLeft:-50,
            lineHeight: 0,
            clipPath: 'inset(30px 0 0 0)' // Crop 30px from top
          }}
    />
  </div>
</Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
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



              {/* Use NavDropdown Component */}
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
              
              <Link 
                to="/team" 
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/team"
                    ? theme === "dark" 
                      ? "bg-white/10 text-white" 
                      : "bg-primary/10 text-primary"
                    : theme === "dark" 
                      ? "text-gray-300 hover:text-white hover:bg-white/5" 
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Team
              </Link>
              
              <Link 
                to="/careers" 
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-2 px-3 rounded-md",
                  location.pathname === "/careers"
                    ? theme === "dark" 
                      ? "bg-white/10 text-white" 
                      : "bg-primary/10 text-primary"
                    : theme === "dark" 
                      ? "text-gray-300 hover:text-white hover:bg-white/5" 
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                Careers
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

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "rounded-full w-9 h-9 flex items-center justify-center",
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
 <Button size="sm" asChild>
                <Link to="/consultation"> Book Free  <br/> Consultation </Link>
              </Button>

              
              {/* Search Input (Optional - like reference) 
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "border rounded-full py-1.5 px-4 pl-10 text-sm w-40 focus:w-56 focus:outline-none transition-all duration-300",
                    theme === "dark" 
                      ? "bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-400 focus:border-white/30" 
                      : "bg-gray-100/80 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-primary/50"
                  )}
                />
                <Search className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )} />
              </div>*/}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden hover:text-blue-400 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center md:hidden pt-20">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className={cn(
            "relative z-50 rounded-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-95 animate-fade-in-up mt-4",
            theme === "dark" 
              ? "bg-gray-900/95 border border-white/10" 
              : "bg-white/95 border border-gray-200 shadow-lg"
          )}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={theme === "dark" ? "text-white" : "text-gray-900"}>Menu</h3>
              <button 
                className={`transition-opacity duration-300 ${
                  theme === "dark" ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {mobileMenuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={cn(
                    "text-lg w-full text-center py-3 rounded-xl transition-all flex items-center justify-center gap-2",
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
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;