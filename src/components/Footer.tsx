import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { submitFooterForm } from "@/firebase";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 // Update the handleSubmit function in your Footer component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmissionState({ status: "loading" });

  try {
    // Basic validation
    if (!formData.name.trim()) {
      throw new Error("Name is required");
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Please enter a valid email");
    }
    if (!formData.message.trim()) {
      throw new Error("Message is required");
    }

    const { success, message } = await submitFooterForm({
      ...formData,
      source: window.location.pathname
    });

    if (!success) throw new Error("Submission failed");

    setSubmissionState({
      status: "success",
      message: message || "Thank you! We'll get back to you soon."
    });

    setFormData({ name: "", email: "", message: "" });

  } catch (error: any) {
    setSubmissionState({
      status: "error",
      message: error.message || "Submission failed. Please try again."
    });
  }
};

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links - 3D Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-background rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
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

          {/* Legal Links - 3D Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-background rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-background rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Contact Info</h3>
              <div className="space-y-4">
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  123 Business Street, Tech City, TC 12345
                </p>
                <p className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  info@bds.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form - 3D Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-background rounded-lg border border-border p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Get In Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                  disabled={submissionState.status === "loading"}
                >
                  {submissionState.status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {submissionState.status === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    {submissionState.message}
                  </p>
                )}
                {submissionState.status === "success" && (
                  <p className="text-green-500 text-sm text-center">
                    {submissionState.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BDS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}