import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    auth,
    provider,
    signInWithPopup,
    db,
    ref,
    get,
    remove,
    query,
    orderByChild,
    equalTo
} from "@/firebase";
import {
    BellOff,
    CheckCircle,
    AlertTriangle,
    ArrowLeft,
    Mail,
    Shield,
    Lock,
    Zap,
    X,
    ChevronDown,
    Users,
    Calendar,
    Sparkles
} from "lucide-react";

export default function PremiumUnsubscribePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const emailParam = searchParams.get("email");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // idle | success | error | confirm
    const [message, setMessage] = useState("");
    const [userEmail, setUserEmail] = useState(emailParam || "");
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState("");
    const [animationComplete, setAnimationComplete] = useState(false);

    const unsubscribeReasons = [
        "Receiving too many emails",
        "Content not relevant to me",
        "Emails too frequent",
        "Prefer other communication channels",
        "Privacy concerns",
        "Not what I expected",
        "Other (please specify)"
    ];

    const alternativeOptions = [
        {
            icon: Zap,
            title: "Reduce Frequency",
            description: "Receive weekly digests instead of daily updates",
            action: "Switch to weekly"
        },
        {
            icon: Users,
            title: "Change Topics",
            description: "Customize which topics you're interested in",
            action: "Update preferences"
        },
        {
            icon: Calendar,
            title: "Pause Temporarily",
            description: "Take a break and resume later",
            action: "Pause for 30 days"
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setAnimationComplete(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleUnsubscribe = async (skipReason = false) => {
        if (!skipReason && selectedReasons.length === 0) {
            setShowReasonModal(true);
            return;
        }

        setLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!userEmail) {
                setUserEmail(user.email);
            }

            const subscribersRef = ref(db, "newsletterSubscribers");
            const emailQuery = query(
                subscribersRef,
                orderByChild("email"),
                equalTo(user.email || userEmail)
            );

            const snapshot = await get(emailQuery);

            if (!snapshot.exists()) {
                setStatus("error");
                setMessage("No active subscription found for this email.");
                return;
            }

            const subscriptionId = Object.keys(snapshot.val())[0];

            // Store unsubscribe reason if provided
            if (selectedReasons.length > 0) {
                const unsubscribeData = {
                    email: user.email || userEmail,
                    reasons: selectedReasons,
                    otherReason: otherReason,
                    timestamp: new Date().toISOString(),
                    optedForAlternatives: false
                };
                // Save to a separate collection for analytics
                await fetch("/api/unsubscribe-reasons", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(unsubscribeData)
                });
            }

            // 3. Remove subscription
            await remove(ref(db, `newsletterSubscribers/${subscriptionId}`));

            const sendUnsubscribeEmail = async (email, name) => {
                try {
                    const res = await fetch("/api/send-unsubscribe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, name })
                    });

                    if (!res.ok) {
                        throw new Error("Failed to send email");
                    }

                    console.log("Unsubscribe email sent successfully!");
                } catch (err) {
                    console.error(err);
                }
            };

            // Example usage after removing from Firebase DB:
            await sendUnsubscribeEmail(user.email, subscriptionData?.name);



            // Add to do-not-contact list
            const doNotContactRef = ref(db, "doNotContact");
            await fetch("/api/do-not-contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email || userEmail,
                    timestamp: new Date().toISOString(),
                    source: "unsubscribe_page"
                })
            });

            setStatus("success");
            setMessage(
                "You've been successfully unsubscribed. We're sorry to see you go!"
            );

            // Reset reasons modal
            setShowReasonModal(false);
            setSelectedReasons([]);
            setOtherReason("");

        } catch (error) {
            console.error(error);
            setStatus("error");

            if (error.code === "auth/popup-closed-by-user") {
                setMessage("Sign-in was cancelled. Please try again.");
            } else if (error.code === "auth/account-exists-with-different-credential") {
                setMessage("Please use the original sign-in method for this email.");
            } else {
                setMessage("An unexpected error occurred. Please try again or contact support.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAlternativeOption = (option) => {
        // In a real app, this would trigger the specific action
        setMessage(`Redirecting to ${option.title.toLowerCase()}...`);
        setTimeout(() => {
            // Navigate to preferences page or update via API
            navigate("/preferences");
        }, 1000);
    };

    const toggleReason = (reason) => {
        setSelectedReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    const ConfettiEffect = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -50,
                        rotate: 0
                    }}
                    animate={{
                        y: window.innerHeight,
                        rotate: 360,
                        x: Math.random() * 100 - 50 + (Math.random() * window.innerWidth)
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        ease: "easeOut",
                        delay: Math.random() * 0.5
                    }}
                />
            ))}
        </div>
    );

    return (
        <>
            <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full max-w-2xl"
                    >
                        {/* Header with brand */}
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Business & Data Solutions
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                            >
                                Manage Your Subscription
                            </motion.h1>

                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-600 dark:text-gray-400 max-w-md mx-auto"
                            >
                                We value your inbox space. Choose how you'd like to proceed.
                            </motion.p>
                        </div>

                        {/* Main Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden"
                        >
                            {/* Card header */}
                            <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                        <BellOff className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Unsubscribe Options
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Secure & privacy-focused management
                                        </p>
                                    </div>
                                    <div className="ml-auto flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure</span>
                                    </div>
                                </div>

                                {/* Email preview if available */}
                                {userEmail && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                                        <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {userEmail}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center space-y-6"
                                    >
                                        {animationComplete && <ConfettiEffect />}
                                        <div className="relative w-20 h-20 mx-auto">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", delay: 0.2 }}
                                                className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
                                            />
                                            <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                Unsubscription Complete
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {message}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                                                What's next?
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => navigate("/")}
                                                    className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <ArrowLeft className="w-4 h-4" />
                                                        <span>Back to Home</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => navigate("/feedback")}
                                                    className="px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span>Share Feedback</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Alternative options */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Consider These Alternatives First
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                {alternativeOptions.map((option, index) => (
                                                    <motion.button
                                                        key={index}
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAlternativeOption(option)}
                                                        className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-left group hover:shadow-lg"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                                                <option.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                                    {option.title}
                                                                </h4>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                    {option.description}
                                                                </p>
                                                                <div className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                                    {option.action} →
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                                    Or proceed to unsubscribe
                                                </span>
                                            </div>
                                        </div>

                                        {/* Unsubscribe section */}
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    Unsubscribe Completely
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    This will permanently remove you from all mailing lists.
                                                    You'll need to sign in to verify your identity.
                                                </p>
                                            </div>

                                            {/* Security badge */}
                                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Secure Verification Required
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        We use Google Sign-In to protect your account
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <motion.button
                                                    whileTap={{ scale: 0.97 }}
                                                    disabled={loading}
                                                    onClick={() => handleUnsubscribe(false)}
                                                    className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-50"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="w-5 h-5" />
                                                            Unsubscribe Securely
                                                        </>
                                                    )}
                                                </motion.button>

                                                <button
                                                    onClick={() => navigate(-1)}
                                                    className="px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>

                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-6"
                                            >
                                                <div className="flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                                                            {message}
                                                        </p>
                                                        <button
                                                            onClick={() => setStatus("idle")}
                                                            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                                                        >
                                                            Try again
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="text-xs text-gray-500 dark:text-gray-500">
                                        <p className="flex items-center gap-1">
                                            <Shield className="w-3 h-3" />
                                            Your data is processed securely and never shared
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-500">
                                        Need help?{" "}
                                        <a
                                            href="mailto:support@businessanddatasolutions.com"
                                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        >
                                            Contact our support team
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats/Info footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500"
                        >
                            <p>Over 10,000 subscribers manage their preferences monthly</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Reason Selection Modal */}
            <AnimatePresence>
                {showReasonModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={() => setShowReasonModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Help us improve
                                    </h3>
                                    <button
                                        onClick={() => setShowReasonModal(false)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Please let us know why you're unsubscribing (optional)
                                </p>
                            </div>

                            <div className="p-6 max-h-96 overflow-y-auto">
                                <div className="space-y-3">
                                    {unsubscribeReasons.map((reason, index) => (
                                        <motion.label
                                            key={index}
                                            whileTap={{ scale: 0.98 }}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedReasons.includes(reason)
                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedReasons.includes(reason)}
                                                onChange={() => toggleReason(reason)}
                                                className="w-4 h-4 text-blue-600 rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                {reason}
                                            </span>
                                        </motion.label>
                                    ))}
                                </div>

                                {selectedReasons.includes("Other (please specify)") && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4"
                                    >
                                        <textarea
                                            value={otherReason}
                                            onChange={(e) => setOtherReason(e.target.value)}
                                            placeholder="Please specify your reason..."
                                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm placeholder-gray-500"
                                            rows="3"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setShowReasonModal(false);
                                            handleUnsubscribe(true);
                                        }}
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Skip
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowReasonModal(false);
                                            handleUnsubscribe(true);
                                        }}
                                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}