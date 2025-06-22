import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { submitForm } from "@/firebase";

export default function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: ""
  });

  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  // New state for showing popup
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

      const success = await submitForm("cta-demo-request", {
        ...formData,
        source: window.location.pathname
      });

      if (!success) throw new Error("Submission failed at Firebase level");

      setSubmissionState({
        status: "success",
        message: "Thank you! We'll contact you shortly."
      });

      setFormData({ name: "", email: "", company: "" });
      
      // Show the popup confirmation here
      setShowPopup(true);

    } catch (error: any) {
      setSubmissionState({
        status: "error",
        message: error.message || "Submission failed. Please try again."
      });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSubmissionState({ status: "idle" }); // reset submission state
  };

  return (
    <section
      id="contact"
      className="text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground"
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
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 dark:bg-white/80 text-gray-900 dark:text-gray-900 placeholder-gray-500"
                    value={formData.company}
                    onChange={handleChange}
                  />
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
                <p className="text-center text-xs text-white/70 dark:text-white/70">
                  By requesting, you agree to our Terms and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
    {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-gray-900 rounded-lg p-8 max-w-sm mx-4 text-center shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-white">Thank you!</h3>
      <p className="mb-6 text-gray-300">{submissionState.message}</p>
      <button
        onClick={closePopup}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
      >
        Close
      </button>
    </div>
  </div>
)}

    </section>
  );
}
