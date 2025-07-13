// firebase/blogService.js
import { db } from "@/firebase";
import {
  ref,
  onValue,
  set,
  update,
  push,
  remove,
  get,
  increment,
} from "firebase/database";

// Base path for blog interactions
const getInteractionPath = (postId) => `blogPostInteractions/${postId}`;

// ---------------------------
// Newsletter Subscriptions (Updated)
// ---------------------------

export const submitNewsletterEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // More strict validation
  
  // Validate email format
  if (!emailRegex.test(email)) {
    console.error('Email validation failed:', email);
    throw new Error('Please enter a valid email address');
  }

  try {
    console.log('Attempting to subscribe:', email);
    
    const subscriptionsRef = ref(db, 'newsletterSubscriptions');
    const newSubscriptionRef = push(subscriptionsRef);
    
    const subscriptionData = {
      email: email.trim().toLowerCase(), // Normalize email
      timestamp: Date.now(),
      verified: false,
      source: 'website' // Additional tracking field
    };

    console.log('Subscription data:', subscriptionData);
    
    await set(newSubscriptionRef, subscriptionData);
    console.log('Subscription successful');
    
    return true;
  } catch (error) {
    console.error('Full subscription error:', {
      message: error.message,
      code: error.code || 'NO_CODE',
      stack: error.stack
    });
    
    // Convert Firebase errors to user-friendly messages
    if (error.code === 'PERMISSION_DENIED') {
      throw new Error('Subscription service is currently unavailable');
    } else if (error.message.includes('offline')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error('Subscription failed. Please try again later.');
  }
};

// ---------------------------
// Blog Post Interactions (Optimized)
// ---------------------------

export const listenToPostUpdates = (postId, callback) => {
  const postRef = ref(db, getInteractionPath(postId));
  const unsubscribe = onValue(postRef, (snapshot) => {
    try {
      callback(snapshot.val() || {});
    } catch (error) {
      console.error('Error in post updates callback:', error);
    }
  }, (error) => {
    console.error('Post updates listener error:', error);
  });
  
  return unsubscribe;
};

export const toggleLike = async (postId, userId, isLiked) => {
  const path = getInteractionPath(postId);
  const updates = {
    [`likes/${userId}`]: !isLiked,
    'likeCount': increment(isLiked ? -1 : 1)
  };

  try {
    console.log('Updating likes:', updates);
    await update(ref(db, path), updates);
  } catch (error) {
    console.error("Like toggle failed:", {
      postId,
      userId,
      error: error.message
    });
    throw error;
  }
};

export const toggleBookmark = async (postId, userId, isBookmarked) => {
  const path = getInteractionPath(postId);
  const updates = {
    [`bookmarks/${userId}`]: !isBookmarked,
    'bookmarkCount': increment(isBookmarked ? -1 : 1)
  };

  try {
    console.log('Updating bookmarks:', updates);
    await update(ref(db, path), updates);
  } catch (error) {
    console.error("Bookmark toggle failed:", {
      postId,
      userId,
      error: error.message
    });
    throw error;
  }
};

export const addComment = async (postId, userId, text, author, email) => {
  const path = getInteractionPath(postId);
  const commentRef = ref(db, `${path}/comments`);
  
  try {
    console.log('Adding comment to post:', postId);
    const newCommentRef = push(commentRef);
    
    const commentData = {
      text: text.trim(),
      author: author.trim(),
      email: email?.trim() || '',
      userId,
      timestamp: Date.now(),
      date: new Date().toISOString() // Standardized format
    };

    await set(newCommentRef, commentData);
    await update(ref(db, path), {
      commentCount: increment(1)
    });
    
    console.log('Comment added successfully');
  } catch (error) {
    console.error("Comment submission failed:", {
      postId,
      userId,
      error: error.message
    });
    throw error;
  }
};

// ---------------------------
// Blog Post Data (Enhanced)
// ---------------------------

export const fetchBlogPosts = async () => {
  try {
    console.log('Fetching all blog posts');
    const snapshot = await get(ref(db, "blogPosts"));
    
    if (!snapshot.exists()) {
      console.warn('No blog posts found');
      return [];
    }
    
    const posts = Object.entries(snapshot.val()).map(([key, value]) => ({
      id: key,
      ...value,
      // Normalize data
      tags: Array.isArray(value.tags) ? value.tags : [],
      relatedPosts: Array.isArray(value.relatedPosts) ? value.relatedPosts : []
    }));
    
    console.log(`Fetched ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error("Blog posts fetch failed:", error);
    throw new Error('Failed to load blog posts');
  }
};

export const fetchSingleBlogPost = async (postId) => {
  try {
    console.log('Fetching single post:', postId);
    const snapshot = await get(ref(db, `blogPosts/${postId}`));
    
    if (!snapshot.exists()) {
      console.warn('Post not found:', postId);
      return null;
    }
    
    const postData = snapshot.val();
    const normalizedPost = {
      id: postId,
      ...postData,
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      relatedPosts: Array.isArray(postData.relatedPosts) ? postData.relatedPosts : []
    };
    
    console.log('Post data:', normalizedPost);
    return normalizedPost;
  } catch (error) {
    console.error("Single post fetch failed:", {
      postId,
      error: error.message
    });
    throw new Error('Failed to load blog post');
  }
};

export const getPostById = async (targetId) => {
  try {
    console.log('Finding post by ID:', targetId);
    const snapshot = await get(ref(db, "blogPosts"));
    
    if (!snapshot.exists()) {
      console.warn('No posts available');
      return null;
    }

    const posts = snapshot.val();
    for (const key in posts) {
      if (posts[key].id?.toString() === targetId.toString()) {
        console.log('Found matching post:', key);
        return { 
          ...posts[key], 
          firebaseKey: key,
          // Normalize
          tags: Array.isArray(posts[key].tags) ? posts[key].tags : [],
          relatedPosts: Array.isArray(posts[key].relatedPosts) ? posts[key].relatedPosts : []
        };
      }
    }
    
    console.warn('No post found with ID:', targetId);
    return null;
  } catch (error) {
    console.error("Post search failed:", {
      targetId,
      error: error.message
    });
    throw new Error('Failed to search for post');
  }
};

// ---------------------------
// Utility Functions
// ---------------------------

export const getPostInteractionCounts = async (postId) => {
  try {
    const snapshot = await get(ref(db, getInteractionPath(postId)));
    const data = snapshot.val() || {};
    
    return {
      likeCount: data.likeCount || 0,
      bookmarkCount: data.bookmarkCount || 0,
      commentCount: data.commentCount || 0
    };
  } catch (error) {
    console.error('Failed to get interaction counts:', error);
    return {
      likeCount: 0,
      bookmarkCount: 0,
      commentCount: 0
    };
  }
};