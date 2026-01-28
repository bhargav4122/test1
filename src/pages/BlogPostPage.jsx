import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  Share2,
  MessageSquare,
  Bookmark,
  Heart,
  ChevronRight,
  Check,
  Building,
  Target,
  Lightbulb,
  Shield,
  Lock,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Eye,
  Clock4,
  Tag,
  BarChart3,
  Users,
  Zap,
  Globe,
  Cpu,
  Layers,
  FileCode,
  FileText
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import * as blogService from "@/firebase/blogService";
import { auth, onAuthStateChanged } from "@/firebase";
import { signInWithGoogle } from "@/authService";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import SEO from "@/components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Firebase imports for Google subscription
import {
  signInWithPopup,
  provider,
  db,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  push,
  get
} from "@/firebase";

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Post & Interaction State
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Google Subscription State
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [googleSubscribed, setGoogleSubscribed] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  // Auth State
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await blogService.getPostById(id);
      setPost(fetchedPost);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUser(null);
        setUserId(null);
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to post updates
  useEffect(() => {
    if (!id || !userId) return;
    const unsubscribe = blogService.listenToPostUpdates(id, (data) => {
      setLikes(Object.keys(data?.likes || {}).length);
      setIsLiked(!!data?.likes?.[userId]);
      setComments(Object.values(data?.comments || {}));
      setIsBookmarked(!!data?.bookmarks?.[userId]);
    });
    return () => unsubscribe();
  }, [id, userId]);

  // Google Subscribe Handler
  const handleGoogleSubscribe = async () => {
    setLoadingGoogle(true);
    setGoogleError('');
    setGoogleSubscribed(false);

    try {
      // 1. Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Check if already subscribed by email
      const subscribersRef = ref(db, 'newsletterSubscribers');
      const emailQuery = query(
        subscribersRef,
        orderByChild('email'),
        equalTo(user.email)
      );

      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        setGoogleSubscribed(true);
        setGoogleError('You are already subscribed with this email.');
        return;
      }

      // 3. Prepare subscriber data
      const subscriberData = {
        email: user.email,
        userId: user.uid,
        name: user.displayName || user.email.split('@')[0],
        profilePicture: user.photoURL || null,
        timestamp: Date.now(),
        provider: 'google',
        source: 'blog_post_subscription',
        metadata: {
          userAgent: navigator.userAgent.substring(0, 200),
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          page: window.location.pathname,
        }
      };

      // 4. Add to Firebase with auto-generated ID using push()
      const newSubscriberRef = push(subscribersRef);
      await set(newSubscriberRef, subscriberData);

      setGoogleSubscribed(true);
      setGoogleError('');

      // 5. Optional: Send to Zapier or other webhook
      try {
        const formData = new URLSearchParams();
        formData.append('formType', 'newsletter_google_blog');
        formData.append('customerEmail', user.email);
        formData.append('customerName', user.displayName || 'Google User');
        formData.append('userId', user.uid);
        formData.append('firebaseId', newSubscriberRef.key);
        formData.append('timestamp', new Date().toISOString());
        formData.append('source', 'blog_google_signup');
        formData.append('verified', 'true');

        await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3c1dy1/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });
      } catch (zapierError) {
        console.log('Zapier logging failed:', zapierError);
      }

    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setGoogleError('Google sign-in was cancelled.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setGoogleError('This email is already associated with another account.');
      } else if (error.code === 'PERMISSION_DENIED' || error.message.includes('permission_denied')) {
        setGoogleError('Database permission denied. Please contact support.');
      } else {
        setGoogleError(error.message || 'Google sign-in failed. Please try again.');
      }

      setGoogleSubscribed(false);
    } finally {
      setLoadingGoogle(false);
    }
  };

  // Interaction handlers
  const handleLike = async () => {
    if (!userId) {
      signInWithGoogle();
      return;
    }
    await blogService.toggleLike(id, userId, isLiked);
  };

  const handleBookmark = async () => {
    if (!userId) {
      signInWithGoogle();
      return;
    }
    await blogService.toggleBookmark(id, userId, isBookmarked);
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && userId) {
      await blogService.addComment(id, userId, newComment, userName, user.email);
      setNewComment("");
      setShowCommentForm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-16">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-lg font-medium text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center pt-16">
        <Card className="max-w-md w-full p-8 text-center border shadow-lg">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This article may have been moved or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.content?.substring(0, 160) || "Company blog post"}
        keywords={post.tags?.join(", ")}
        image={post.image}
        type="article"
      />

      {/* Main container */}
      <div className="min-h-screen bg-background overflow-x-hidden pt-16">
        
        {/* Back Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <button
              onClick={() => navigate('/blog')}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl text-foreground hover:bg-accent/50 transition-all duration-300 font-medium hover:border-primary/30"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium hover:scale-105"
              >
                <Shield className="h-4 w-4" />
                Get Secure Updates
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area - Takes 8 columns on desktop */}
            <main className="lg:col-span-8">
              <div className="max-w-3xl mx-auto">
                
                {/* Article Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  {/* Category & Industry Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge 
                      variant="default" 
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="font-medium">{post.category}</span>
                      </div>
                    </Badge>
                    
                    {/* Industry/Technology Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="px-3 py-1.5 rounded-lg border-border/50 hover:border-primary/50 transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1.5" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                  >
                    {post.title}
                  </motion.h1>

                  {/* Subtitle */}
                  {post.subtitle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg sm:text-xl text-muted-foreground mb-6"
                    >
                      {post.subtitle}
                    </motion.p>
                  )}

                  {/* Meta Information Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                  >
                    {/* Publish Date */}
                    <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Published</span>
                      </div>
                      <p className="font-semibold">{post.date}</p>
                    </div>

                    {/* Read Time */}
                    <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock4 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Read Time</span>
                      </div>
                      <p className="font-semibold">{post.readTime}</p>
                    </div>

                    
                  </motion.div>
                </motion.div>

                {/* Featured Image - Optimized */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted/50 mb-8"
                >
                  <div className="aspect-video w-full relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain"
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 animate-pulse"></div>
                    )}
                  </div>
                  {/* Image Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm text-white/90 text-center">
                      {post.imageCaption || post.title}
                    </p>
                  </div>
                </motion.div>

                {/* Key Takeaways - Premium Design */}
                {post.keyTakeaways && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/5 border-l-4 border-primary rounded-r-xl p-6 mb-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Executive Summary</h3>
                        <p className="text-sm text-muted-foreground">Key insights at a glance</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {post.keyTakeaways.slice(0, 4).map((takeaway, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="mt-0.5 p-1 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-foreground/90 group-hover:text-foreground transition-colors">
                            {takeaway}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Premium Article Content */}
                <motion.article
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative mb-12"
                >
                  {/* Content Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 rounded-3xl" />
                  
                  {/* Premium Content Container */}
                  <div className="relative space-y-8">
                    {/* Introduction Section */}
                    {(post.introduction || post.excerpt) && (
                      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-primary/20">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">Overview</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-foreground/90">
                          {post.introduction || post.excerpt}
                        </p>
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none 
                      prose-headings:scroll-mt-24 prose-headings:font-bold
                      prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6
                      prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3
                      prose-h3:text-2xl prose-h3:mt-7 prose-h3:mb-4
                      prose-p:text-lg prose-p:leading-relaxed prose-p:my-5
                      prose-a:text-primary hover:prose-a:underline
                      prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6
                      prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                      prose-pre:bg-muted prose-pre:rounded-xl prose-pre:p-4
                      mb-12">
                      
                      <div className="space-y-8">
                        {post.content ? (
                          <div 
                            className="content-wrapper"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                        ) : (
                          <div className="space-y-6">
                            <p className="text-lg leading-relaxed">
                              In today's rapidly evolving technological landscape, organizations are increasingly seeking innovative solutions to drive growth and maintain competitive advantage.
                            </p>
                            
                            <h2>Strategic Implementation Framework</h2>
                            <p className="text-lg leading-relaxed">
                              Successful implementation requires a structured approach that balances innovation with operational stability.
                            </p>
                            
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 my-8">
                              <div className="flex items-center gap-3 mb-4">
                                <Lightbulb className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-lg">Industry Insight</h3>
                              </div>
                              <p className="text-foreground/90">
                                The integration of artificial intelligence, automation, and data analytics will become increasingly critical for sustainable growth.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Callout Boxes */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap className="h-5 w-5 text-blue-500" />
                          <h4 className="font-bold">Quick Take</h4>
                        </div>
                        <p className="text-sm text-foreground/90">
                          Actionable insights based on current industry trends.
                        </p>
                      </div>
                      
                      <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <BarChart3 className="h-5 w-5 text-purple-500" />
                          <h4 className="font-bold">Data-Driven</h4>
                        </div>
                        <p className="text-sm text-foreground/90">
                          Insights backed by verified data from authoritative sources.
                        </p>
                      </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-card/50 border border-border rounded-2xl p-6 mt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">Key Conclusion</h3>
                      </div>
                      <p className="text-foreground/90">
                        Organizations must prioritize strategic alignment and continuous adaptation to maintain relevance in dynamic market conditions.
                      </p>
                    </div>
                  </div>
                </motion.article>

                {/* Interaction Bar - Premium */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 mb-8"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Was this helpful?</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={handleLike}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
                            isLiked
                              ? "text-red-500 bg-red-500/10 border border-red-500/20"
                              : "text-muted-foreground hover:text-red-500 hover:bg-red-500/5 hover:border hover:border-red-500/10"
                          )}
                        >
                          <Heart className={cn("h-5 w-5", isLiked && "fill-current animate-pulse")} />
                          <span className="font-semibold">{likes}</span>
                        </button>

                        <button
                          onClick={handleBookmark}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
                            isBookmarked
                              ? "text-blue-500 bg-blue-500/10 border border-blue-500/20"
                              : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 hover:border hover:border-blue-500/10"
                          )}
                        >
                          <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                          <span className="font-semibold">{isBookmarked ? "Saved" : "Save"}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setShowCommentForm(true);
                          document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border hover:border-primary/10 transition-all duration-300"
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-semibold">{comments.length}</span>
                        <span className="hidden sm:inline">Comments</span>
                      </button>

                      <Separator orientation="vertical" className="h-6" />

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Share:</span>
                        <button className="p-2.5 rounded-xl border border-border/50 hover:bg-accent hover:border-primary/30 transition-all duration-300">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments Section */}
                <motion.div
                  id="comments-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-16"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Community Discussion</h3>
                      <p className="text-muted-foreground">Join the conversation with verified professionals</p>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                      {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </Badge>
                  </div>

                  {/* Comment Input */}
                  <div className="bg-card border border-border/50 rounded-2xl p-6 mb-8">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {user.displayName?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.displayName}</p>
                            <p className="text-sm text-muted-foreground">Share your professional insights</p>
                          </div>
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                         <textarea
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  className="w-full bg-background dark:bg-gray-900 border border-border dark:border-gray-700 rounded-xl p-4 min-h-[120px] resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-muted-foreground/70"
  placeholder="Share your thoughts, ask questions, or provide feedback..."
  required
/>
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                            <p className="text-xs text-muted-foreground">
                              💡 Be constructive • 🤝 Stay professional • 🔒 Verified community
                            </p>
                            <Button
                              type="submit"
                              disabled={!newComment.trim()}
                              className="px-6 py-2.5 rounded-xl"
                            >
                              Post Comment
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                          <MessageSquare className="h-10 w-10 text-primary" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Join the Professional Discussion</h4>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Sign in with Google to share your insights and connect with other professionals in the industry
                        </p>
                        <Button
                          onClick={signInWithGoogle}
                          className="px-8 py-2.5 rounded-xl"
                        >
                          Sign in to Comment
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment, idx) => (
                      <div key={idx} className="bg-card/50 border border-border/30 rounded-2xl p-5 hover:border-primary/20 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {comment.author?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground/90 mb-4">{comment.text}</p>
                        <div className="flex items-center gap-4">
                          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Like
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </main>

            {/* Sidebar - Right side */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* Content Source Info - Professional */}
                <Card className="border border-border/50 rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <div className="flex items-center justify-center w-full h-full">
                        <FileText className="h-7 w-7 text-primary" />
                      </div>
                    </Avatar>
                    <div>
                      <h4 className="font-bold mb-1">Industry Insights</h4>
                      <p className="font-semibold mb-2">Expert Analysis</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Curated from leading industry sources and technology publications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Globe className="h-3 w-3 mr-1.5" />
                          Global Sources
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1.5" />
                          Verified Content
                        </Badge>
                        {post.industry && (
                          <Badge variant="outline" className="text-xs">
                            <Building className="h-3 w-3 mr-1.5" />
                            {post.industry}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Google Subscription Card */}
                <Card className="border border-blue-300/30 dark:border-blue-700/30 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Secure Newsletter</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        Google-authenticated only
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGoogleSubscribe}
                    disabled={loadingGoogle || googleSubscribed}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group hover:shadow-lg"
                  >
                    {loadingGoogle ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                        <span className="font-medium">Processing...</span>
                      </>
                    ) : googleSubscribed ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="font-semibold">Subscribe with Google</span>
                      </>
                    )}
                  </button>

                  {googleError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <p className="text-sm text-red-600 dark:text-red-400">{googleError}</p>
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 rounded-lg bg-blue-500/10">
                        <Shield className="h-3.5 w-3.5 text-blue-500" />
                      </div>
                      <span className="text-foreground/80">Google-verified professionals only</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 rounded-lg bg-purple-500/10">
                        <Lock className="h-3.5 w-3.5 text-purple-500" />
                      </div>
                      <span className="text-foreground/80">One-click unsubscribe anytime</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t border-border/30">
                    By subscribing, you agree to our{" "}
                    <Link to="/privacy" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                      Privacy Policy
                    </Link>
                  </p>
                </Card>

                {/* Related Articles */}
                <Card className="border border-border/50 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Related Reads</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Advanced Cloud Architecture Patterns", category: "Technology", readTime: "6 min" },
                      { title: "Digital Transformation Strategies 2024", category: "Strategy", readTime: "8 min" },
                      { title: "AI Integration Best Practices", category: "Innovation", readTime: "5 min" }
                    ].map((article, idx) => (
                      <Link
                        key={idx}
                        to="#"
                        className="group block p-4 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-accent/50 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs mb-2">
                              {article.category}
                            </Badge>
                            <p className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Popular Topics */}
                <Card className="border border-border/50 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Trending Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "Data Analytics", "IoT", "Blockchain", "UX/UI"].map((topic) => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className="px-3 py-1.5 rounded-lg cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-t border-border/50 mt-16 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Stay Ahead in Your Industry</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our exclusive community of verified professionals for premium insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoogleSubscribe}
                  disabled={loadingGoogle || googleSubscribed}
                  className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group hover:shadow-lg"
                >
                  {loadingGoogle ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : googleSubscribed ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Already Subscribed</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="font-semibold">Subscribe with Google</span>
                    </>
                  )}
                </button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/blog')}
                  className="px-8 py-3.5 rounded-xl"
                >
                  Explore More Articles
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subscribe Modal - Google Only */}
      <AnimatePresence>
        {showSubscribeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubscribeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-2 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl"></div>
                <div className="relative">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm inline-flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Secure Newsletter Access
                  </h3>
                  <p className="text-white/80 text-sm">
                    Google-authenticated subscription only
                  </p>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
             
                
                {/* Google Sign-In Button */}
                <button
                  onClick={handleGoogleSubscribe}
                  disabled={loadingGoogle || googleSubscribed}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4"
                >
                  {loadingGoogle ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
                      <span className="font-medium">Processing...</span>
                    </>
                  ) : googleSubscribed ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="font-medium">Already Subscribed</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="font-semibold">Subscribe with Google</span>
                    </>
                  )}
                </button>

                {googleError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 text-center">{googleError}</p>
                  </div>
                )}

                {/* Security Features */}
                <div className="space-y-3 mb-6">
                 
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">Google-verified email only</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm">One-click unsubscribe anytime</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <Shield className="h-3 w-3" />
                  <span>We respect your privacy. No spam, ever.</span>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to our{" "}
                  <a href="/privacy" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                  {" "}and{" "}
                  <a href="/terms" className="text-blue-500 hover:underline">
                    Terms of Service
                  </a>.
                </p>

                <div className="mt-1 pt-1 border-t border-border/50 text-center">
                  <button
                    onClick={() => setShowSubscribeModal(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    X Close this window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogPostPage;
