import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { submitCallToAction } from "@/firebase";
import EmailValidation from "../EmailValidation";

export default function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "UK" // Default to UK
  });

  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate phone number when country changes
    if (name === "country") {
      validatePhoneNumber(formData.phone, value);
    }
  };

  const validatePhoneNumber = (phone: string, country: string): boolean => {
    if (!phone) {
      setPhoneValid(true); // Don't show error if empty
      return true;
    }

    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');

    let isValid = false;
    let minLength = 10;
    let maxLength = 12;

    switch (country) {
      case "GB": // UK
        isValid = /^(0|44)\d{9,10}$/.test(digitsOnly);
        minLength = 10;
        maxLength = 11; // 0 + 10 digits or 44 + 10 digits
        break;
      case "IN": // India
        isValid = /^[6-9]\d{9}$/.test(digitsOnly);
        minLength = 10;
        maxLength = 10;
        break;
      case "US": // USA
        isValid = /^\d{10}$/.test(digitsOnly);
        minLength = 10;
        maxLength = 10;
        break;
      default:
        isValid = digitsOnly.length >= 10 && digitsOnly.length <= 12;
    }

    setPhoneValid(isValid);
    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    validatePhoneNumber(value, formData.country);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const { success, message } = await submitCallToAction(formData);

    if (success) {
      setSubmissionState({
        status: "success",
        message: message || "Thank you! We'll get back to you soon."
      });
      setFormData({ 
        name: "", 
        email: "", 
        company: "",
        phone: "",
        country: "UK"
      });
    } else {
      setSubmissionState({
        status: "error",
        message: message || "Submission failed. Please try again."
      });
    }
  };

  const getPhonePlaceholder = () => {
    switch (formData.country) {
      case "GB": return "e.g., 07400 123456 or +447400123456";
      case "IN": return "e.g., 9876543210";
      case "US": return "e.g., 5551234567";
      default: return "Enter your phone number";
    }
  };

  return (
    <section
      id="contact"
      className=""
    >
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-1000 ${
          inView ? "opacity-100" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-8 md:p-16 relative overflow-hidden shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="absolute right-0 bottom-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-white opacity-10"></div>
            <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white opacity-10"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Ready to transform your data strategy?
              </h2>
              <p className="text-white/90 text-lg max-w-md">
                Join thousands of forward-thinking companies using Data & Business Solutions
                to drive business success.
              </p>
            </div>

            <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <select
                      name="country"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="US">US</option>
                      <option value="GB">UK</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="tel"
                      name="phone"
                      placeholder={getPhonePlaceholder()}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                    {!phoneValid && formData.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {formData.country === "GB" && "UK numbers should start with 0 or +44 (e.g., 07400 123456)"}
                        {formData.country === "IN" && "Indian numbers should be 10 digits starting with 6-9"}
                        {formData.country === "US" && "US numbers should be 10 digits (e.g., 5551234567)"}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-white text-primary hover:bg-white/90 hover:text-primary dark:bg-white dark:text-primary"
                  disabled={submissionState.status === "loading"}
                >
                  {submissionState.status === "loading" ? (
                    "Submitting..."
                  ) : (
                    <>
                      Get in touch
                      <ArrowRight className="ml-2 h-4 w-4" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}