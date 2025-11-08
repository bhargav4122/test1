import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { submitNewsletterEmail } from "@/firebase";
import { validateEmail } from '@/utils/emailValidation';

export default function Footer() {
  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' }
  ];

 const [email, setEmail] = useState("");
   const [subscribed, setSubscribed] = useState(false);
   const [error, setError] = useState("");
 
     const handleSubscribe = async (e) => {
     e.preventDefault();
     setSubscribed(false);
     setError("");
 
     if (!validateEmail(email)) {
     setError("Please provide a valid business/work email address");
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
    <footer className=" pt-2 flex flex-col overflow-x-hidden bg-white dark:bg-black">
      <div className="container mx-auto px-4 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links - 3D Card */}
          <div className="group relative">
           <div className="absolute inset-0.5 from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative  rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center hover:text-primary transition-colors duration-300"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links - 3D Card */}
          <div className="group relative">
           <div className="absolute inset-0.5 from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative  rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info - 3D Card */}
          <div className="group relative">
         <div className="absolute -inset-0.5 from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative  rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Contact Info</h3>
              <div className="space-y-4">
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                 London, E7 8LS, UK
                </p>
                <p className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  +44 7405269396,<br/>
                  +91 6304472055
                </p>
                <p className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  info@businessanddatasolutions.com
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription - 3D Card */}
          <div className="group relative">
           <div className="absolute -inset-0.5 from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative  rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
             
      
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-background"
            required
          />
          <button
            type="submit"
            disabled={!email || subscribed}
            className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {subscribed && (
            <p className="text-green-500 text-sm">Thanks for subscribing!</p>
          )}
        </form>
      
  
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BDS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
