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
import SEO from '@/components/common/SEO';
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
            const subscriptionData = snapshot.val()[subscriptionId];

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

            // Remove subscription
            await remove(ref(db, `newsletterSubscribers/${subscriptionId}`));

            // Send unsubscribe email via n8n
            const sendUnsubscribeEmail = async (email, name) => {
                try {
                    const res = await fetch(
                        "https://bdssocialmedia.app.n8n.cloud/webhook-test/unsubscribe",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ 
                                email: email,
                                name: name || "Subscriber"
                            })
                        }
                    );

                    if (!res.ok) {
                        const errorText = await res.text();
                        console.error("n8n error response:", errorText);
                        throw new Error(`Failed to send unsubscribe email: ${res.status}`);
                    }

                    const result = await res.json();
                    console.log("n8n success response:", result);
                    return result;
                } catch (err) {
                    console.error("Error calling n8n webhook:", err);
                    return { success: false, error: err.message };
                }
            };

            await sendUnsubscribeEmail(user.email, subscriptionData?.name);

            // Add to do-not-contact list
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
            setMessage("You've been successfully unsubscribed. We're sorry to see you go!");

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
                setMessage("An unexpected error occurred or you haven't subscribed to our newsletter. Please try again or contact support.");
            }
        } finally {
            setLoading(false);
        }
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <SEO
                title="Unsubscribe | Business and Data Solutions LTD"
                description="Manage your subscription preferences with Business and Data Solutions LTD"
                keywords="unsubscribe, email preferences, communication management, newsletter unsubscribe"
            />

            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <main className="flex-1 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 p-8 md:p-12"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />

                                <div className="relative">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-900/20 flex items-center justify-center">
                                                <BellOff className="w-6 h-6 text-red-500 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">Unsubscribe Portal</span>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Secure • Instant • Privacy-Focused</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                        <span className="block text-gray-900 dark:text-white">Manage Your</span>
                                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                                            Subscription
                                        </span>
                                    </h1>

                                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
                                        Take control of your communication preferences with Business and Data Solutions LTD.
                                        We value your inbox space and privacy.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Main Card */}
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden mb-16"
                        >
                            <div className="p-8 md:p-12">
                                {/* Card header */}
                                <div className="flex items-start mb-8">
                                    <div className="mr-6">
                                        <div className="w-14 h-14 rounded-xl bg-red-500/10 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400 font-bold text-2xl">
                                            1
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                            Subscription Management
                                        </h2>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <span className="px-3 py-1 bg-red-500/10 text-red-500 dark:text-red-400 text-sm font-semibold rounded-full">
                                                Secure Verification Required
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {status === "success" ? (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center space-y-8"
                                        >
                                            {animationComplete && <ConfettiEffect />}
                                            <div className="relative w-24 h-24 mx-auto">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: 0.2 }}
                                                    className="absolute inset-0 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-xl"
                                                />
                                                <CheckCircle className="w-24 h-24 text-green-500 dark:text-green-400 relative z-10" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                    Unsubscription Complete
                                                </h3>
                                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                                    {message}
                                                </p>
                                            </div>

                                            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                                    What would you like to do next?
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => navigate("/")}
                                                        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <ArrowLeft className="w-5 h-5" />
                                                            <span>Back to Home</span>
                                                        </div>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => navigate("/feedback")}
                                                        className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-semibold border border-gray-300 dark:border-gray-700 hover:border-primary transition-colors"
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span>Share Feedback</span>
                                                        </div>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <>
                                            {/* Email preview if available */}
                                            {userEmail && (
                                                <motion.div
                                                    className="p-6 bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-xl border border-primary/20"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                >
                                                    <div className="flex items-center">
                                                        <Mail className="w-6 h-6 text-primary mr-3" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Email Address</p>
                                                            <p className="text-lg text-gray-700 dark:text-gray-300">{userEmail}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Security badge */}
                                            <motion.div
                                                className="p-6 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-500/10 rounded-xl border border-blue-500/20"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-start">
                                                    <Shield className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-4 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Identity Verification</p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            We use Google Sign-In to ensure only you can manage your subscription. 
                                                            This protects your account and maintains your privacy.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Unsubscribe action */}
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                                        Complete Unsubscription
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        This will permanently remove you from all mailing lists and communications.
                                                        You'll need to sign in with Google to verify your identity.
                                                    </p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        disabled={loading}
                                                        onClick={() => handleUnsubscribe(false)}
                                                        className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-600 dark:to-orange-600 py-4 font-semibold hover:shadow-lg hover:shadow-red-500/20 dark:hover:shadow-red-500/10 transition-all disabled:opacity-50"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                Processing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Mail className="w-5 h-5" />
                                                                Click here to Unsubscribe Securely with Google
                                                            </>
                                                        )}
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => navigate(-1)}
                                                        className="px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                                    >
                                                        Cancel
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {status === "error" && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <div className="p-6 bg-gradient-to-r from-red-500/5 to-transparent dark:from-red-500/10 rounded-xl border border-red-500/20">
                                                        <div className="flex items-start">
                                                            <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-semibold text-red-700 dark:text-red-300 mb-2">Error Occurred</p>
                                                                <p className="text-red-600 dark:text-red-400">
                                                                    {message}
                                                                </p>
                                                                <button
                                                                    onClick={() => setStatus("idle")}
                                                                    className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                                                                >
                                                                    Try again
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Your data is processed securely and never shared
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Need help?{" "}
                                        <a
                                            href="mailto:hr@businessanddatasolutions.com"
                                            className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90 hover:underline font-medium"
                                        >
                                            Contact our support team
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-sm text-gray-600 dark:text-gray-400"
                        >
                            <p>Subscribers manage their preferences securely with Google verification</p>
                        </motion.div>
                    </div>
                </main>
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
                            className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Help us improve
                                    </h3>
                                    <button
                                        onClick={() => setShowReasonModal(false)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
                                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedReasons.includes(reason)}
                                                onChange={() => toggleReason(reason)}
                                                className="w-4 h-4 text-primary rounded focus:ring-primary"
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
                                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                            rows="3"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setShowReasonModal(false);
                                            handleUnsubscribe(true);
                                        }}
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Skip
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setShowReasonModal(false);
                                            handleUnsubscribe(true);
                                        }}
                                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                                    >
                                        Continue
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
