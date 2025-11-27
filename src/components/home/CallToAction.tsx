import React, { useState, useCallback, memo, useMemo } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { submitCallToAction } from "@/firebase";
import EmailValidation from "../EmailValidation";

// Memoized icon
const MemoizedArrowRight = memo(ArrowRight);

// Static country data
const COUNTRIES = [
  { value: "US", label: "US" },
  { value: "GB", label: "UK" },
  { value: "IN", label: "India" }
] as const;

// Phone validation patterns
const PHONE_PATTERNS = {
  GB: { pattern: /^(0|44)\d{9,10}$/, min: 10, max: 11 },
  IN: { pattern: /^[6-9]\d{9}$/, min: 10, max: 10 },
  US: { pattern: /^\d{10}$/, min: 10, max: 10 }
} as const;

// Initial form state
const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "GB" as const
};

function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px 0px'
  });

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  // Memoized change handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "country") {
      validatePhoneNumber(formData.phone, value);
    }
  }, [formData.phone]);

  const validatePhoneNumber = useCallback((phone: string, country: string): boolean => {
    if (!phone) {
      setPhoneValid(true);
      return true;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    const countryPattern = PHONE_PATTERNS[country as keyof typeof PHONE_PATTERNS];
    
    if (!countryPattern) {
      const isValid = digitsOnly.length >= 10 && digitsOnly.length <= 12;
      setPhoneValid(isValid);
      return isValid;
    }

    const isValid = countryPattern.pattern.test(digitsOnly);
    setPhoneValid(isValid);
    return isValid;
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    validatePhoneNumber(value, formData.country);
  }, [formData.country, validatePhoneNumber]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      setSubmissionState({
        status: "error",
        message: "Name is required"
      });
      return;
    }
    
    if (!emailValid) {
      setSubmissionState({
        status: "error",
        message: "Please provide a valid email address"
      });
      return;
    }

    if (formData.phone && !validatePhoneNumber(formData.phone, formData.country)) {
      setSubmissionState({
        status: "error",
        message: "Please provide a valid phone number"
      });
      return;
    }

    setSubmissionState({ status: "loading" });

    try {
      const { success, message } = await submitCallToAction(formData);

      if (success) {
        setSubmissionState({
          status: "success",
          message: message || "Thank you! We'll get back to you soon."
        });
        setFormData(INITIAL_FORM_DATA);
      } else {
        setSubmissionState({
          status: "error",
          message: message || "Submission failed. Please try again."
        });
      }
    } catch (error) {
      setSubmissionState({
        status: "error",
        message: "An unexpected error occurred. Please try again."
      });
    }
  }, [formData, emailValid, validatePhoneNumber]);

  // Memoized phone placeholder
  const phonePlaceholder = useMemo(() => {
    switch (formData.country) {
      case "GB": return "e.g., 07400 123456 or +447400123456";
      case "IN": return "e.g., 9876543210";
      case "US": return "e.g., 5551234567";
      default: return "Enter your phone number";
    }
  }, [formData.country]);

  // Memoized phone error message
  const phoneErrorMessage = useMemo(() => {
    if (phoneValid || !formData.phone) return null;
    
    switch (formData.country) {
      case "GB": return "UK numbers should start with 0 or +44 (e.g., 07400 123456)";
      case "IN": return "Indian numbers should be 10 digits starting with 6-9";
      case "US": return "US numbers should be 10 digits (e.g., 5551234567)";
      default: return "Please enter a valid phone number";
    }
  }, [formData.country, formData.phone, phoneValid]);

  // Memoized form content
  const formContent = useMemo(() => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 placeholder-gray-500 transition-colors"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Work Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 placeholder-gray-500 transition-colors"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <EmailValidation 
          email={formData.email} 
          onValid={setEmailValid} 
        />
      </div>
      
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company (Optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 placeholder-gray-500 transition-colors"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <select
            name="country"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 transition-colors"
            value={formData.country}
            onChange={handleChange}
          >
            {COUNTRIES.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-span-2">
          <input
            type="tel"
            name="phone"
            placeholder={phonePlaceholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 placeholder-gray-500 transition-colors"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          {phoneErrorMessage && (
            <p className="text-red-500 text-xs mt-1">
              {phoneErrorMessage}
            </p>
          )}
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full rounded-xl bg-white text-primary hover:bg-white/90 transition-colors"
        disabled={submissionState.status === "loading"}
      >
        {submissionState.status === "loading" ? (
          "Submitting..."
        ) : (
          <>
            Get in touch
            <MemoizedArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      
      {submissionState.status === "error" && (
        <p className="text-center text-sm text-red-200 dark:text-red-300">
          {submissionState.message}
        </p>
      )}
      
      {submissionState.status === "success" && (
        <p className="text-center text-sm text-green-200 dark:text-green-300">
          {submissionState.message}
        </p>
      )}
      
      <p className="text-center text-xs text-white/70 dark:text-white/70">
        By requesting, you agree to our Terms and Privacy Policy.
      </p>
    </form>
  ), [formData, handleSubmit, handleChange, handlePhoneChange, phonePlaceholder, phoneErrorMessage, submissionState]);

  return (
    <section id="contact" className="py-12">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="rounded-2xl p-6 md:p-12 relative overflow-hidden shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          {/* Simplified decorative elements */}
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
            <div className="absolute right-0 bottom-0 h-48 w-48 translate-x-1/4 translate-y-1/4 rounded-full bg-white opacity-5"></div>
            <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/4 -translate-y-1/4 rounded-full bg-white opacity-5"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
                Ready to transform your data strategy?
              </h2>
              <p className="text-base max-w-md opacity-90">
                Join thousands of forward-thinking companies using Data & Business Solutions
                to drive business success.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              {formContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CallToAction);
