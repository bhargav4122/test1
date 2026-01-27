import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  User,
  ArrowLeft,
  Share2,
  MessageSquare,
  Bookmark,
  Heart,
  Send,
  Mail,
  Bell,
  Tag,
  Users,
  TrendingUp,
  Eye,
  ChevronRight,
  Check,
  Building,
  Target,
  Lightbulb,
  FileText,
  Shield,
  Lock,
  CheckCircle,
  Sparkles
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
      console.log('Google user signed in:', user.email, user.uid);

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

      console.log('Subscribed successfully with ID:', newSubscriberRef.key);
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
      console.error('Google Sign-In Error:', error.code, error.message);

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

      {/* Main container with proper spacing */}
      <div className="min-h-screen bg-background overflow-x-hidden pt-16">
        
        {/* Back Navigation - Centered */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => navigate('/blog')}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                <Shield className="h-4 w-4" />
                Get Secure Updates
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- Hero Section - Centered --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mb-12">
          
          {/* Category & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            <Badge className="bg-primary text-primary-foreground px-3 py-1">
              {post.category}
            </Badge>
            {post.tags?.slice(0, 3).map((tag, index) => (
              <Badge key={tag} variant="outline" className="px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </motion.div>

          {/* Title - Centered */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Subtitle if exists */}
          {post.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground text-center mb-8"
            >
              {post.subtitle}
            </motion.p>
          )}

          {/* Author & Meta Info - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {post.author?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">Company Team</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views || "1.2k"} views</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image - Centered with proper aspect ratio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-xl overflow-hidden bg-muted mb-8"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse"></div>
            )}
          </motion.div>

          {/* Key Takeaways */}
          {post.keyTakeaways && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Key Takeaways</h3>
              </div>
              <ul className="space-y-2">
                {post.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* --- Main Content Layout - Centered Grid --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content - Centered and takes most space */}
            <main className="lg:col-span-8 xl:col-span-9">
              <div className="max-w-3xl mx-auto">
                {/* Article Content */}
                <motion.article
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-lg prose-img:shadow-md
                    prose-blockquote:border-l-4 prose-blockquote:border-primary
                    prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6
                    prose-blockquote:not-italic
                    prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                    mb-12"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.article>

                {/* Interaction Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border mb-8"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                        isLiked
                          ? "text-red-500 bg-red-500/10"
                          : "text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                      )}
                    >
                      <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                      <span className="font-medium">{likes}</span>
                    </button>

                    <button
                      onClick={handleBookmark}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                        isBookmarked
                          ? "text-blue-500 bg-blue-500/10"
                          : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5"
                      )}
                    >
                      <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                      <span className="font-medium">{isBookmarked ? "Saved" : "Save"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowCommentForm(true);
                        document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="font-medium">{comments.length}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Share this article:</span>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Author Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-card border border-border rounded-xl p-6 mb-12"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {post.author?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{post.author}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Building className="h-3 w-3 mr-1" />
                          Team Member
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {post.authorBio || `${post.author} is part of our team, sharing insights and expertise in ${post.category.toLowerCase()} and related fields.`}
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          More Articles
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments Section */}
                <motion.div
                  id="comments-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-16"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Discussion</h3>
                    <Badge variant="secondary" className="text-sm">
                      {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </Badge>
                  </div>

                  {/* Comment Input */}
                  <div className="bg-card border border-border rounded-xl p-6 mb-8">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback>
                              {user.displayName?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.displayName}</p>
                            <p className="text-xs text-muted-foreground">Share your thoughts</p>
                          </div>
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-background border border-border rounded-lg p-4 min-h-[100px] resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Join the discussion..."
                            required
                          />
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-xs text-muted-foreground">
                              Be respectful and constructive
                            </p>
                            <Button
                              type="submit"
                              disabled={!newComment.trim()}
                              className="px-6"
                            >
                              Post Comment
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-bold text-lg mb-2">Join the Conversation</h4>
                        <p className="text-muted-foreground mb-6">
                          Sign in to share your thoughts and connect with others
                        </p>
                        <Button
                          onClick={signInWithGoogle}
                          className="px-8"
                        >
                          Sign in to Comment
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment, idx) => (
                      <div key={idx} className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {comment.author?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground/90">{comment.text}</p>
                        <div className="flex gap-4 mt-4">
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
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 space-y-6">
                
                {/* Google-Only Newsletter Subscription Card */}
                <Card className="border border-blue-300/30 dark:border-blue-700/30 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Secure Newsletter Access</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        Google-authenticated only
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    To prevent spam and ensure security, newsletter subscription requires Google Sign-In. 
                    Your email will be verified and managed securely.
                  </p>
                  
                  {/* Google Sign-In Button */}
                  <button
                    onClick={handleGoogleSubscribe}
                    disabled={loadingGoogle || googleSubscribed}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                  >
                    {loadingGoogle ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                        <span className="font-medium">Processing...</span>
                      </>
                    ) : googleSubscribed ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Subscribed Successfully!</span>
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

                  {/* Error Message */}
                  {googleError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{googleError}</p>
                    </div>
                  )}

                  {/* Security Features */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Cannot be subscribed by others</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 text-blue-500" />
                      <span>Google-verified email only</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3 text-purple-500" />
                      <span>One-click unsubscribe anytime</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By subscribing, you agree to our{" "}
                    <Link to="/privacy" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </Card>

                {/* Related Articles */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {[
                      { title: "How We Built Our Platform", category: "Technology", date: "2 days ago" },
                      { title: "Company Culture in 2024", category: "Culture", date: "1 week ago" },
                      { title: "Latest Industry Trends", category: "Industry", date: "2 weeks ago" }
                    ].map((article, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="group block p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-primary font-medium mb-1">
                              {article.category}
                            </p>
                            <p className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {article.date}
                        </p>
                      </a>
                    ))}
                  </div>
                </Card>

                {/* Popular Tags */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold text-lg">Popular Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Technology", "Culture", "Innovation", "Leadership", "Development", "Strategy", "Teamwork", "Growth"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Community Stats */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold text-lg">Community Stats</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Readers</span>
                      <span className="font-semibold">45.2K</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Articles Published</span>
                      <span className="font-semibold">128</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Community Members</span>
                      <span className="font-semibold">8.4K</span>
                    </div>
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        </div>

        {/* CTA Section - Google Only */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 py-16 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Join Our Secure Community</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Access exclusive insights with Google-authenticated subscription for enhanced security
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoogleSubscribe}
                  disabled={loadingGoogle || googleSubscribed}
                  className="flex items-center justify-center gap-3 px-8 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
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
                >
                  <Target className="h-5 w-5 mr-2" />
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
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-center">
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
                <div className="text-center mb-6">
                  <Sparkles className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-bold text-lg mb-2">Why Google Sign-In?</h4>
                  <p className="text-sm text-muted-foreground">
                    We use Google Sign-In to prevent spam, ensure email verification, 
                    and protect your privacy. Only verified professionals can subscribe.
                  </p>
                </div>
                
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
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Prevents spam subscriptions</span>
                  </div>
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

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <button
                    onClick={() => setShowSubscribeModal(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Close this window
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
