import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
    <div className="space-y-4 md:col-span-1">
  {/* Logo Container - Cropped Tight */}
  <div className="flex flex-col">
    <Link to="/" className="block overflow-hidden" style={{ height: '100px' }}> {/* Adjust height as needed */}
      {/* Light Mode Logo - Cropped */}
      <div className="relative -mt-[100px]"> {/* Negative margin crops top */}
        <img 
          src="/BDS Logo - Original with Transparent Background (1).svg" 
          alt="BDS Logo" 
          className={`w-[265px] h-auto ${theme === 'light' ? 'block' : 'hidden'}`}
          style={{
              display: theme === 'light' ? 'block' : 'none',
            marginLeft:-40,
            lineHeight: 0,
            clipPath: 'inset(30px 0 0 0)' // Crop 30px from top
          }}
        />
      </div>
      
      {/* Dark Mode Logo - Cropped */}
      <div className="relative -mt-[100px]"> {/* Same crop for dark mode */}
        <img 
          src="/BDS Logo - Original with Transparent Background.svg" 
          alt="BDS Logo" 
          className={`w-[265px] h-auto ${theme === 'dark' ? 'block' : 'hidden'}`}
          style={{
            display: theme === 'dark' ? 'block' : 'none',
            marginLeft:-40,
            lineHeight: 0,
            clipPath: 'inset(30px 0 0 0)' // Crop 30px from top
          }}
        />
      </div>
    </Link>

    <p className="text-sm text-muted-foreground max-w-xs mt-1"
    style={{
      marginTop: '-34px', // Pulls text up against logo
      paddingTop: 0
    }}>
      Transforming business data into strategic advantages through
      cutting-edge analytics and intelligence solutions.
    </p>
  </div>
</div>

       

          {/* Rest of your footer content remains the same */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Solutions</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Data Integration
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Predictive Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    AI Insights
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Custom Dashboards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#press" className="text-muted-foreground hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#documentation" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#help" className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#api" className="text-muted-foreground hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#community" className="text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BDS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}