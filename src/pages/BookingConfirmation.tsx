import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "min-h-screen pt-16 relative overflow-hidden flex items-center justify-center",
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <section className="py-20 relative w-full">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Consultation Scheduled
              </Badge>
            </motion.div>

            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r",
                theme === "dark"
                  ? "from-blue-400 to-purple-500"
                  : "from-primary to-blue-600",
                "leading-tight"
              )}
            >
              Your Meeting is Confirmed!
            </h1>

            <motion.p
              className={cn(
                "text-xl max-w-2xl mx-auto",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thank you for booking your consultation. You’ll receive an email
              shortly with the meeting details. We look forward to connecting
              with you!
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="max-w-2xl mx-auto"
          >
            <div
              className={cn(
                "rounded-2xl shadow-2xl p-8 border relative overflow-hidden text-center",
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 backdrop-blur-md"
                  : "bg-white/90 backdrop-blur-md",
                "transition-all duration-300 group"
              )}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      theme === "dark" ? "bg-primary/20" : "bg-primary/10"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-6 w-6",
                        theme === "dark" ? "text-primary" : "text-primary"
                      )}
                    />
                  </div>
                </div>

                <h2
                  className={cn(
                    "text-2xl font-bold mb-4",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                >
                  We’ve Reserved Your Spot
                </h2>

                <p
                  className={cn(
                    "text-base mb-8",
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  Please check your inbox for the confirmation email. If you
                  don’t see it, check your spam folder or contact our support.
                </p>

                <Button
                  className="w-full hover:scale-[1.02] transition-transform shadow-lg hover:shadow-primary/30"
                  size="lg"
                  onClick={() => navigate("/")}
                >
                  Go Back Home
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingConfirmation;
