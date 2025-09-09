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
} from "lucide-react";
import { Card } from "../components/ui/card";
//import BlogFilterSidebar from "../components/Blog/BlogFilterSidebar";
import * as blogService from "@/firebase/blogService";
import { auth, onAuthStateChanged } from "@/firebase";
import { signInWithGoogle } from "@/authService";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";



const BlogPostPage = () => {
  // All hooks must be declared unconditionally at the top
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { theme } = useTheme();
  // Post state
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // User interaction state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  // User auth state
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  
  // Filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Handlers
  const handleSearch = (value) => setSearchTerm(value);
  const handleCategoryChange = (value) => setSelectedCategory(value);
  const handleTagChange = (value) => setSelectedTag(value);
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  // Load posts and extract categories/tags
  useEffect(() => {
    const loadPosts = async () => {
      const posts = await blogService.fetchBlogPosts();
      setBlogPosts(posts);

      // Extract categories
      const catMap = {};
      const tagSet = new Set();

      posts.forEach((post) => {
        if (post.category) {
          const name = post.category.trim();
          catMap[name] = (catMap[name] || 0) + 1;
        }

        if (Array.isArray(post.tags)) {
          post.tags.forEach((tag) => tagSet.add(tag.trim()));
        }
      });

      const extractedCategories = Object.entries(catMap).map(([name, count]) => ({
        name,
        count,
      }));

      setCategories(extractedCategories);
      setTags([...tagSet]);
    };

    loadPosts();
  }, []);

  // Fetch current post
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
        setUserEmail(user.email);
        setUserName(user.displayName);
      } else {
        setUser(null);
        setUserId(null);
        setUserEmail(null);
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Post updates listener
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

  // Filtered posts calculation
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = searchTerm
        ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? post.category?.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      const matchesTag = selectedTag
        ? post.tags?.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
        : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogPosts, searchTerm, selectedCategory, selectedTag]);

  // Related posts calculation
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return post.relatedPosts
      ? filteredPosts.filter((p) => post.relatedPosts.includes(p.id))
      : filteredPosts.slice(0, 2);
  }, [post, filteredPosts]);

  // Interaction handlers
  const handleLike = async () => {
    if (!userId) return;
    await blogService.toggleLike(id, userId, isLiked);
  };

  const handleBookmark = async () => {
    if (!userId) return;
    await blogService.toggleBookmark(id, userId, isBookmarked);
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && userId) {
      await blogService.addComment(id, userId, newComment, userName, userEmail);
      setNewComment("");
      setShowCommentForm(false);
    }
  };

  // Loading and error states - moved after all hooks
  if (loading) {
    return <p className="text-center py-20">Loading post...</p>;
  }

  if (!post) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested blog post doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Main render
  return (
    <div className=" min-h-screen">
      {/* Hero section */}
      <div className="pt-20">
  
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
  
        <div className=" mb-6 pt-10"> {/* Increased z-index and relative positioning */}
        <button
          onClick={() => navigate('/blog', { replace: true })}
          className="flex items-center text-primary hover:text-primary/80 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </button>
      </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </span>
            </div>
            <div className="flex gap-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
    

      </div>
      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem" }}>
  <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
    {/* Article */}
    <article style={{ flex: 2 }}>

            <Card>
              <div className="p-6 dark:bg-black dark:text-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
                />

                {/* Article content */}
                <div className="relative">
                  <div
                    className="prose max-w-none text-foreground relative bg-gradient-to-b from-background to-muted/20 border border-border/50 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rotate-45 origin-bottom-left" />
                  </div>
                </div>

                {/* Author */}
                <div className="mt-12 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{post.author}</h4>
                      <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
                      isLiked
                        ? "bg-red-100 border-red-200 text-red-600"
                        : "border-border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-2" fill={isLiked ? "currentColor" : "none"} />
                    {likes}
                  </button>

                  <button
                    onClick={() =>
                      navigator.share?.({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      }).catch(() => navigator.clipboard.writeText(window.location.href))
                    }
                    className="flex items-center px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>

                  <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className="flex items-center px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment ({comments.length})
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
                      isBookmarked
                        ? "bg-blue-100 border-blue-200 text-blue-600"
                        : "border-border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Bookmark
                      className="h-4 w-4 mr-2"
                      fill={isBookmarked ? "currentColor" : "none"}
                    />
                    Save
                  </button>
                </div>

                {/* Comment Form */}
                {showCommentForm && (
                  <form onSubmit={handleCommentSubmit} className="mt-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment..."
                      className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all min-h-[150px]",
                  theme === "dark" 
                    ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                )}
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setShowCommentForm(false)}
                        className="px-4 py-2 text-muted-foreground hover:text-primary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>
                )}

                {/* Comments */}
                {comments.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">
                      Comments ({comments.length})
                    </h4>
                    <div className="space-y-4">
                      {comments.map((comment, idx) => (
                        <div
                          key={idx}
                          className="border-b border-border/50 pb-4 last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="mt-1 text-foreground">{comment.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!user && (
                  <button
                    onClick={signInWithGoogle}
                    className="bg-primary text-white px-4 py-2 rounded-md mb-4"
                  >
                    Sign in with Google to comment or like
                  </button>
                )}
              </div>
            </Card>




            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((post) => (
                    <Card key={post.id}>
                      <Link to={`/blog/${post.id}`} className="block">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
                            {post.category}
                          </span>
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground">{post.excerpt}</p>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </article>

     
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
