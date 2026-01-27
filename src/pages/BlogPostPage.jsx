import React, { useState, useEffect, useMemo } from "react";
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
  ExternalLink
} from "lucide-react";
import { Card } from "../components/ui/card";
import * as blogService from "@/firebase/blogService";
import { auth, onAuthStateChanged } from "@/firebase";
import { signInWithGoogle } from "@/authService";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import SEO from "@/components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

  // --- Handlers & Effects ---
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await blogService.getPostById(id);
      setPost(fetchedPost);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-dashed">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This article may have been moved or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Insights
          </button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.content?.substring(0, 160) || "Blog post details"}
        keywords={post.tags?.join(", ")}
        image={post.image}
        type="article"
      />

      <div className="min-h-screen bg-background relative selection:bg-primary/20 overflow-x-hidden">
        
        {/* Back to Blog Button - Placed after navbar */}
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl pt-24 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <button
              onClick={() => navigate('/blog')}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-muted/50 transition-all font-medium text-sm sm:text-base shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
          </motion.div>
        </div>

        {/* --- Hero Section --- */}
        <div className="relative w-full">
          {/* Featured Image Container */}
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-muted aspect-video max-h-[500px]"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse"></div>
              )}
            </motion.div>
          </div>

          {/* Post Meta Information */}
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className="bg-primary hover:bg-primary/90 text-white px-3 py-1 text-sm">
                  {post.category}
                </Badge>
                {post.tags?.slice(0, 3).map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className="text-xs sm:text-sm font-medium text-muted-foreground bg-muted/50 px-2 sm:px-3 py-1 rounded-md"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground"
              >
                {post.title}
              </motion.h1>

              {/* Meta Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base text-muted-foreground border-b border-border pb-6"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-medium">{post.author}</span>
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  {post.readTime}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- Main Content Layout --- */}
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            {/* Article Body */}
            <main className="col-span-12">
              <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-a:text-primary 
                prose-img:rounded-lg sm:prose-img:rounded-xl 
                prose-img:shadow-md sm:prose-img:shadow-lg 
                prose-img:w-full prose-img:max-h-[400px] sm:prose-img:max-h-[500px]
                prose-img:object-contain
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 
                prose-blockquote:py-2 prose-blockquote:px-4 sm:prose-blockquote:px-6 
                prose-blockquote:rounded-r-lg">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="[&_img]:max-w-full [&_img]:h-auto [&_img]:object-contain [&_img]:mx-auto"
                />
              </article>

              {/* Interaction Buttons - NOW PLACED AFTER ARTICLE CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-8 sm:mt-12 pt-8 border-t border-border"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105",
                        isLiked
                          ? "text-red-500 bg-red-500/10"
                          : "text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                      )}
                    >
                      <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                      <span className="font-medium">{likes} Likes</span>
                    </button>

                    <button
                      onClick={handleBookmark}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105",
                        isBookmarked
                          ? "text-blue-500 bg-blue-500/10"
                          : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5"
                      )}
                    >
                      <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                      <span className="font-medium">
                        {isBookmarked ? "Saved" : "Save"}
                      </span>
                    </button>

                    <button
                      onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors hover:scale-105"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="font-medium">
                        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Share:</span>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors hover:scale-105">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Interaction Bar (Fixed Bottom) - Only for quick actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
              >
                <div className="bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl rounded-full px-4 sm:px-6 py-3 flex items-center justify-around">
                  <button
                    onClick={handleLike}
                    className={cn(
                      "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full transition-all hover:scale-105",
                      isLiked
                        ? "text-red-500 bg-red-500/10"
                        : "text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                    )}
                  >
                    <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5", isLiked && "fill-current")} />
                    <span className="text-xs sm:text-sm font-medium">{likes}</span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={cn(
                      "px-2 sm:px-3 py-1.5 rounded-full transition-all hover:scale-105",
                      isBookmarked
                        ? "text-blue-500 bg-blue-500/10"
                        : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5"
                    )}
                  >
                    <Bookmark className={cn("h-4 w-4 sm:h-5 sm:w-5", isBookmarked && "fill-current")} />
                  </button>

                  <button
                    onClick={() => {
                      setShowCommentForm(true);
                      document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2 sm:px-3 py-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 hover:scale-105 transition-all"
                  >
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-2 sm:px-3 py-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 hover:scale-105 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 rotate-90" />
                  </button>
                </div>
              </motion.div>

              {/* Author & Newsletter Section (After Content) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-t border-border pt-8 sm:pt-12"
              >
                {/* Author Card */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg sm:text-xl shrink-0">
                    {post.author?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Written By
                    </h4>
                    <p className="text-base sm:text-lg font-bold text-foreground truncate">{post.author}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Senior Tech Editor</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                      Expert in digital transformation, cloud architecture, and enterprise software solutions.
                    </p>
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className={cn(
                  "p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-center hover:shadow-lg transition-shadow",
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 to-black border border-white/10"
                    : "bg-gradient-to-br from-blue-50 to-white border border-blue-100"
                )}>
                  <div className="relative z-10">
                    <h4 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">Stay Updated</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Get the latest insights delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 sm:px-4 py-2 rounded-lg border bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* --- Discussion Section --- */}
              <div id="comments-section" className="mt-12 sm:mt-16 pt-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                  Discussion
                  <span className="text-xs sm:text-sm font-normal text-muted-foreground bg-muted px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {comments.length}
                  </span>
                </h3>

                {/* Input Area */}
                <div className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm mb-8 sm:mb-10">
                  {user ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary/20"
                          />
                        ) : (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                            {user.displayName?.[0] || "U"}
                          </div>
                        )}
                      </div>
                      <div className="flex-grow w-full">
                        <form onSubmit={handleCommentSubmit}>
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-muted/30 border-none rounded-lg sm:rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-primary/20 min-h-[80px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                            placeholder="Share your perspective..."
                            required
                          />
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
                            <p className="text-xs text-muted-foreground">Be respectful and constructive.</p>
                            <button
                              type="submit"
                              disabled={!newComment.trim()}
                              className="bg-primary text-primary-foreground px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 hover:scale-105"
                            >
                              Post Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 sm:py-6">
                      <p className="text-sm text-muted-foreground mb-3 sm:mb-4">Join the community conversation.</p>
                      <button
                        onClick={signInWithGoogle}
                        className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors hover:scale-105"
                      >
                        Sign in with Google
                      </button>
                    </div>
                  )}
                </div>

                {/* Comments Feed */}
                <div className="space-y-4 sm:space-y-6">
                  {comments.map((comment, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      key={idx}
                      className="flex gap-3 sm:gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs sm:text-sm border border-border">
                          {comment.author?.[0]}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="bg-muted/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none border border-border/50">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 mb-2">
                            <span className="font-semibold text-xs sm:text-sm truncate">{comment.author}</span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed break-words">
                            {comment.text}
                          </p>
                        </div>
                        <div className="flex gap-3 sm:gap-4 mt-1 sm:mt-2 ml-1 sm:ml-2">
                          <button className="text-[10px] sm:text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                            Like
                          </button>
                          <button className="text-[10px] sm:text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
