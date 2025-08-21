import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  push, 
  serverTimestamp, 
  set, 
  update,
  onValue,
  increment,
  get,
  child,
  query, orderByChild, endAt, limitToLast 
  
} from "firebase/database";


import {getStorage, ref as storageRef,  // This is the correct import for storage references
  uploadBytesResumable, uploadBytes ,
  getDownloadURL } from "firebase/storage";
//import { storage, uploadBytes, getDownloadURL } from '@/firebase/firebaseConfig';

import axios from "axios";

import { validateEmail } from '@/utils/emailValidation';

import { format } from 'date-fns';

//import firebase, { db } from "@/firebase";

import {
  getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged
} from "firebase/auth";
// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
 db,
 app,
  auth,
  provider,
  storage, // Export storage
  signInWithPopup,
  onAuthStateChanged,
  ref,
  set,
  push,
  update,
  serverTimestamp,
  onValue,
  increment,
  get,
  child
};



// Generate a consistent user ID based on email + browser fingerprint
const generateUserId = (email: string): string => {
  const fingerprint = [
    navigator.userAgent,
    navigator.hardwareConcurrency,
    screen.width,
    screen.height,
    navigator.language
  ].join('|');
  
  // Simple hash function
  const hash = (str: string): string => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return h.toString(16);
  };

  return `${hash(email)}-${hash(fingerprint)}`;
};

export const submitCallToAction = async (data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    // Basic validation
    if (!data.name.trim() || !data.email.trim()) {
      return { success: false, message: "Name and email are required" };
    }

    const userId = generateUserId(data.email);
    const submissionRef = push(ref(db, 'callToActionSubmissions'));
    
    // Format phone number based on country
    let formattedPhone = data.phone?.replace(/\D/g, '') || null;
    
    if (formattedPhone && data.country === "GB") {
      // Convert UK numbers to international format
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '44' + formattedPhone.substring(1);
      }
    }

    const submissionData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || null,
      phone: formattedPhone,
      country: data.country || null,
      userId,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
      }
    };

    await set(submissionRef, submissionData);

    // Send to Zapier
    const formData = new URLSearchParams();
    formData.append('formType', 'callToAction');
    formData.append('customerEmail', data.email);
    formData.append('customerName', data.name);
    formData.append('company', data.company || '');
    formData.append('phone', formattedPhone || '');
    formData.append('country', data.country || '');
    formData.append('userId', userId);
    formData.append('firebaseId', submissionRef.key || '');

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3q6xaq/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Zapier submission failed');
    }

    return { 
      success: true,
      message: "Thank you! We've received your request and will contact you shortly."
    };
  } catch (error: any) {
    console.error("Call To Action submission error:", error);
    return { 
      success: false,
      message: error.message || "Submission failed. Please try again."
    };
  }
};

// footer get in touch form
export const submitFooterForm = async (data: {
  name: string;
  email: string;
  message: string;
  source?: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const userId = generateUserId(data.email);
    const submissionRef = push(ref(db, 'footerFormSubmissions'));
    
    const submissionData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
      userId,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: data.source || window.location.pathname,
        referrer: document.referrer || 'direct'
      }
    };

    await set(submissionRef, submissionData);

    // Send to Zapier
    const formData = new URLSearchParams();
    formData.append('formType', 'footerForm');
    formData.append('customerEmail', data.email);
    formData.append('customerName', data.name);
    formData.append('message', data.message);
    formData.append('userId', userId);
    formData.append('firebaseId', submissionRef.key || '');

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3etz81/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Zapier submission failed');
    }

    return { 
      success: true,
      message: "Thank you! We've received your message and will respond soon."
    };
  } catch (error: any) {
    console.error("Footer Form submission error:", error);
    return { 
      success: false,
      message: error.message || "Submission failed. Please try again."
    };
  }
};

export const submitContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  services: string[];
  message: string;
  country?: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const userId = generateUserId(data.email);
    const submissionRef = push(ref(db, 'contactFormSubmissions'));

    // Format services as comma-separated string
    const servicesText = data.services.join(', ') || 'None selected';

    const submissionData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim() || null,
      businessName: data.businessName.trim(),
      services: data.services, // Keep as array for database
      message: data.message.trim(),
      userId,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
      }
    };

    await set(submissionRef, submissionData);

    // Send to Zapier with all required fields
    const formData = new URLSearchParams();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim().toLowerCase());
    formData.append('phone', data.phone.trim() || 'Not provided');
    formData.append('businessName', data.businessName.trim());
    formData.append('services', servicesText);
    formData.append('message', data.message.trim());
    formData.append('country', data.country || 'Not specified');
    formData.append('userId', userId);
    formData.append('firebaseId', submissionRef.key || '');
    formData.append('timestamp', new Date().toLocaleString());

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3ef23c/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) throw new Error('Zapier submission failed');

    return { 
      success: true,
      message: "Thank you! We'll contact you soon."
    };
  } catch (error: any) {
    console.error("Submission error:", error);
    return { 
      success: false,
      message: error.message || "Submission failed. Please try again."
    };
  }
};




// Blog Post Functions
export const blogService = {
  // Get a single blog post with interactions
  getBlogPost: async (postId) => {
    try {
      const postRef = ref(db, `blogPosts/${postId}`);
      return new Promise((resolve) => {
        onValue(postRef, (snapshot) => {
          resolve(snapshot.val());
        }, { onlyOnce: true });
      });
    } catch (error) {
      console.error("Error getting blog post:", error);
      return null;
    }
  },

  // Get all blog posts (for your main blog page)
  getAllBlogPosts: async () => {
    try {
      const postsRef = ref(db, 'blogPosts');
      return new Promise((resolve) => {
        onValue(postsRef, (snapshot) => {
          resolve(snapshot.val());
        }, { onlyOnce: true });
      });
    } catch (error) {
      console.error("Error getting all blog posts:", error);
      return null;
    }
  },

  // Update like status
  toggleLike: async (postId, userId, currentLikeStatus) => {
    try {
      const updates = {};
      updates[`blogPosts/${postId}/likes/${userId}`] = !currentLikeStatus;
      updates[`blogPosts/${postId}/likeCount`] = increment(currentLikeStatus ? -1 : 1);
      
      await update(ref(db), updates);
      return true;
    } catch (error) {
      console.error("Error toggling like:", error);
      return false;
    }
  },

  // Update bookmark status
  toggleBookmark: async (postId, userId, currentBookmarkStatus) => {
    try {
      const updates = {};
      updates[`users/${userId}/bookmarks/${postId}`] = !currentBookmarkStatus;
      updates[`blogPosts/${postId}/bookmarkCount`] = increment(currentBookmarkStatus ? -1 : 1);
      
      await update(ref(db), updates);
      return true;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      return false;
    }
  },

  // Add a comment
  addComment: async (postId, userId, commentText, userName, userEmail) => {
    try {
      const commentRef = ref(db, `blogPosts/${postId}/comments`);
      const newCommentRef = push(commentRef);
      
      await set(newCommentRef, {
        text: commentText,
        author: userName || "Anonymous",
        email: userEmail || "",
        userId: userId,
        timestamp: serverTimestamp()
      });
      
      // Increment comment count
      await update(ref(db, `blogPosts/${postId}`), {
        commentCount: increment(1)
      });
      
      return true;
    } catch (error) {
      console.error("Error adding comment:", error);
      return false;
    }
  },

  // Real-time listener for post updates
  listenToPostUpdates: (postId, callback) => {
    const postRef = ref(db, `blogPosts/${postId}`);
    const unsubscribe = onValue(postRef, (snapshot) => {
      callback(snapshot.val());
    });
    return unsubscribe;
  }
};




// Blog post with Zapier webhook
export const submitBlogPostWithZapier = async (blogData: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  author?: string;
}) => {
  try {
    const postRef = ref(db, "blogPosts");
    const newPostRef = push(postRef);
    const newPostId = newPostRef.key;

    const payload = {
      ...blogData,
      id: newPostId,
      timestamp: Date.now(),
    };

    // ✅ Save blog to Firebase
    await set(newPostRef, payload);

    // 🔔 Send data to Zapier webhook
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/23697085/u3zzek2/"; 

    await axios.post(ZAPIER_WEBHOOK_URL, {
      blogId: newPostId,
      title: blogData.title,
      content: blogData.content,
      category: blogData.category,
      tags: blogData.tags || [],
      author: blogData.author || "Admin",
      url: `https://yourdomain.com/blog/${newPostId}`, // Replace with your actual blog URL path
      timestamp: Date.now(),
    });

    console.log("✅ Blog added & Zapier triggered.");
    return true;
  } catch (error) {
    console.error("❌ Error submitting blog with webhook:", error);
    return false;
  }
};


//news subscription
export const submitNewsletterEmail = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!validateEmail(email)) {
      return { success: false, message: "Please provide a valid business/work email address" };
    }

    const userId = generateUserId(email);
    const subscriptionRef = push(ref(db, "newsletterSubscribers"));
    
    const subscriptionData = {
      email: email.trim().toLowerCase(),
      userId,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
      }
    };

    await set(subscriptionRef, subscriptionData);

    // Send to Zapier - Using your specific newsletter URL
    const formData = new URLSearchParams();
    formData.append('formType', 'newsletter');
    formData.append('customerEmail', email.trim().toLowerCase());
    formData.append('userId', userId);
    formData.append('firebaseId', subscriptionRef.key || '');
    formData.append('timestamp', new Date().toISOString());
    formData.append('source', 'website_blog_subscription');
    formData.append('userAgent', navigator.userAgent.substring(0, 120));
    formData.append('pageUrl', window.location.href);

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3c1dy1/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to process subscription');
    }

    return { 
      success: true,
      message: "Thank you for subscribing! Please check your email to confirm."
    };
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return { 
      success: false,
      message: error.message || "Subscription failed. Please try again later."
    };
  }
};




// ======================
// CHATBOT FUNCTIONS
// ======================

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  conversationId: string;
  metadata?: {
    userAgent?: string;
    screenResolution?: string;
    page?: string;
  };
};

type ChatConversation = {
  id: string;
  userId?: string;
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'archived';
  metadata?: {
    initialMessage?: string;
    userAgent?: string;
    screenResolution?: string;
    page?: string;
  };
};

// Helper to generate simple user IDs for chatbot
const generateSimpleUserId = (email: string): string => {
  return email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
};

/**
 * Starts a new chat conversation
 */
export const startChatConversation = async (
  initialMessage: string,
  userId?: string,
  options?: {
    source?: string;
  }
): Promise<{ 
  success: boolean; 
  conversationId?: string; 
  error?: string 
}> => {
  try {
    const conversationRef = push(ref(db, 'chatConversations'));
    const conversationId = conversationRef.key as string;
    
    const conversationData: ChatConversation = {
      id: conversationId,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'active',
      metadata: {
        initialMessage: initialMessage.trim(),
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: options?.source || window.location.pathname,
      }
    };

    const messageId = generateId();
    const messageData: ChatMessage = {
      id: messageId,
      text: initialMessage.trim(),
      sender: 'user',
      timestamp: Date.now(),
      conversationId,
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: options?.source || window.location.pathname,
      }
    };

    const updates = {
      [`chatConversations/${conversationId}`]: conversationData,
      [`chatMessages/${conversationId}/${messageId}`]: messageData,
    };

    await update(ref(db), updates);

    await sendChatNotification({
      type: 'new_conversation',
      conversationId,
      userId,
      message: initialMessage,
      timestamp: new Date().toISOString(),
      metadata: conversationData.metadata,
    });

    return { success: true, conversationId };
  } catch (error: any) {
    console.error('Error starting chat:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to start conversation' 
    };
  }
};

/**
 * Sends a chat message
 */
export const sendChatMessage = async (
  conversationId: string,
  message: string,
  sender: 'user' | 'bot',
  options?: {
    source?: string;
  }
): Promise<{ success: boolean; error?: string }> => {
  try {
    const conversationSnap = await get(ref(db, `chatConversations/${conversationId}`));
    if (!conversationSnap.exists()) {
      throw new Error('Conversation not found');
    }
    
    const conversation = conversationSnap.val() as ChatConversation;
    if (conversation.status !== 'active') {
      throw new Error('Conversation is not active');
    }

    const messageId = generateId();
    const messageData: ChatMessage = {
      id: messageId,
      text: message.trim(),
      sender,
      timestamp: Date.now(),
      conversationId,
      ...(sender === 'user' && {
        metadata: {
          userAgent: navigator.userAgent.substring(0, 120),
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          page: options?.source || window.location.pathname,
        }
      })
    };

    const updates = {
      [`chatMessages/${conversationId}/${messageId}`]: messageData,
      [`chatConversations/${conversationId}/updatedAt`]: Date.now(),
    };

    await update(ref(db), updates);

    if (sender === 'user') {
      await sendChatNotification({
        type: 'new_message',
        conversationId,
        userId: conversation.userId,
        message,
        timestamp: new Date().toISOString(),
        metadata: messageData.metadata,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending message:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send message' 
    };
  }
};

/**
 * Gets chat messages
 */
export const getChatMessages = async (
  conversationId: string,
  options?: {
    limit?: number;
    beforeTimestamp?: number;
  }
): Promise<{ success: boolean; messages?: ChatMessage[]; error?: string }> => {
  try {
    let queryRef = ref(db, `chatMessages/${conversationId}`);
    
    if (options?.beforeTimestamp) {
      queryRef = query(
        queryRef,
        orderByChild('timestamp'),
        endAt(options.beforeTimestamp),
        limitToLast(options.limit || 50)
      );
    } else if (options?.limit) {
      queryRef = query(
        queryRef,
        orderByChild('timestamp'),
        limitToLast(options.limit)
      );
    } else {
      queryRef = query(
        queryRef,
        orderByChild('timestamp')
      );
    }

    const snapshot = await get(queryRef);
    
    if (!snapshot.exists()) {
      return { success: true, messages: [] };
    }

    const messages = Object.values(snapshot.val()) as ChatMessage[];
    messages.sort((a, b) => a.timestamp - b.timestamp);

    return { success: true, messages };
  } catch (error: any) {
    console.error('Error getting messages:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to get messages' 
    };
  }
};

/**
 * Listens for new messages
 */
export const listenForNewMessages = (
  conversationId: string,
  callback: (messages: ChatMessage[], error?: string) => void
): (() => void) => {
  const messagesRef = ref(db, `chatMessages/${conversationId}`);
  
  const unsubscribe = onValue(messagesRef, 
    (snapshot) => {
      try {
        if (snapshot.exists()) {
          const messages = Object.values(snapshot.val()) as ChatMessage[];
          messages.sort((a, b) => a.timestamp - b.timestamp);
          callback(messages);
        } else {
          callback([]);
        }
      } catch (error: any) {
        console.error('Error processing messages:', error);
        callback([], error.message);
      }
    },
    (error) => {
      console.error('Firebase listener error:', error);
      callback([], error.message);
    }
  );

  return unsubscribe;
};

/**
 * Archives a conversation
 */
export const archiveChatConversation = async (
  conversationId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await update(ref(db, `chatConversations/${conversationId}`), {
      status: 'archived',
      updatedAt: Date.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error archiving conversation:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to archive conversation' 
    };
  }
};

type NotificationPayload = {
  type: 'new_conversation' | 'new_message';
  conversationId: string;
  userId?: string;
  message: string;
  timestamp: string;
  metadata?: {
    userAgent?: string;
    screenResolution?: string;
    page?: string;
    initialMessage?: string;
  };
};

const sendChatNotification = async (payload: NotificationPayload): Promise<void> => {
  try {
    const formData = new URLSearchParams();
    formData.append('type', payload.type);
    formData.append('conversationId', payload.conversationId);
    if (payload.userId) formData.append('userId', payload.userId);
    formData.append('message', payload.message);
    formData.append('timestamp', payload.timestamp);
    
    if (payload.metadata) {
      formData.append('userAgent', payload.metadata.userAgent || '');
      formData.append('screenResolution', payload.metadata.screenResolution || '');
      formData.append('page', payload.metadata.page || '');
      if (payload.metadata.initialMessage) {
        formData.append('initialMessage', payload.metadata.initialMessage);
      }
    }

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3q6xaq/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) {
      console.warn('Failed to send notification', await response.text());
    }
  } catch (error) {
    console.error('Notification error:', error);
  }
};

const generateId = (): string => push(ref(db, 'ids')).key as string;




//firebase old application

 export const submitJobApplicationForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  jobTitle: string;
  jobId: string;
  linkedIn?: string;
  portfolio?: string;
  salaryExpectation?: string;
  theme?: string;
  cvUrl?:string;
  userId?: string; 
  
 }): Promise<{ success: boolean; message?: string; applicationId?: string }> => {
  try {
    const userId = data.userId || generateUserId(data.email);
    const applicationRef = push(ref(db, 'jobApplications'));
    
    const applicationData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      message: data.message?.trim() || null,
      jobTitle: data.jobTitle.trim(),
      jobId: String(data.jobId).trim(),
      linkedIn: data.linkedIn?.trim() || null,
      portfolio: data.portfolio?.trim() || null,
      salaryExpectation: data.salaryExpectation?.trim() || null,
      theme: data.theme || null,
       cvUrl: data.cvUrl || null,
      userId,
      status: 'submitted', // Changed from 'application_started'
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || 'direct'
      },
    };

    await set(applicationRef, applicationData);

/*
// Send to Zapier with all required fields
    const formData = new URLSearchParams();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim().toLowerCase());
    formData.append('phone', data.phone.trim() || 'Not provided');
    formData.append('message', data.message.trim());
    formData.append('jobTitle', data.jobTitle.trim());
    formData.append('jobId', String(data.jobId).trim());
    formData.append('linkedIn', data.linkedIn?.trim() || null);
    formData.append('portfolio', data.portfolio?.trim() || null);
    formData.append('salaryExpectation', data.salaryExpectation?.trim() || null);
    formData.append('theme', data.theme || null);
    formData.append(' cvUrl', data.cvUrl || null);
    formData.append('userId', userId);
    formData.append('firebaseId', applicationRef.key || '');
    formData.append('timestamp', new Date().toLocaleString());

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u2h6hla/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    if (!response.ok) throw new Error('Zapier submission failed');

*/


    return { 
      success: true,
      message: "Application submitted successfully",
      applicationId: applicationRef.key 
    };
  } catch (error: any) {
    console.error("Job application submission error:", error);
    return { 
      success: false,
      message: error.message || "Failed to submit application. Please try again."
    };
  }
}


   
export const uploadFileToStorage = async (
  file: File,
  userId: string
): Promise<{ success: boolean; downloadURL?: string; error?: string }> => {
  try {
    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed');
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Create standardized filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `resume_${timestamp}.${fileExtension}`;
    const filePath = `resumes/${userId}/${fileName}`;

    // Prepare metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        originalName: encodeURIComponent(file.name),
        uploader: userId,
        uploaderEmail: auth.currentUser?.email || 'unknown',
        uploadedAt: new Date().toISOString(),
        fileSize: file.size.toString()
      }
    };

    // Upload file
    const fileRef = storageRef(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file, metadata);

    // Wait for upload to complete
    await uploadTask;

    // Get download URL
    const downloadURL = await getDownloadURL(fileRef);

    return { 
      success: true, 
      downloadURL 
    };
  } catch (error: any) {
    console.error('Upload error:', {
      code: error.code,
      message: error.message,
      fileName: file?.name,
      fileSize: file?.size
    });
    
    return {
      success: false,
      error: error.message || "File upload failed"
    };
  }
};

export const uploadResume = async (
  file: File, 
  userId: string,
  applicationId: string
) => {
  try {
    // Validate
    if (!file || !userId || !applicationId) {
      throw new Error('Missing required parameters');
    }

    // Create filename
    const extension = file.name.split('.').pop();
    const fileName = `resume_${Date.now()}.${extension}`;
    const path = `applications/${userId}/${applicationId}/${fileName}`;

    // Upload with metadata
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploader: userId,
        appId: applicationId
      }
    });

    // Return public URL
    return await getDownloadURL(fileRef);
  } catch (error: any) {
    console.error('Upload failed:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};


/**
 * For Application Model 1 (with university program support)
 */
export const submitModel1Application = async (data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  jobTitle: string;
  jobId: string;
  university?: string;
  graduationYear?: string | number;
  currentYear?: string | number;
  preferredField?: string;
  resumeUrl?: string;
  userId: string;
  linkedIn?: string;
  portfolio?: string;
  salaryExpectation?: string;
  theme?: string;
}): Promise<{ 
  success: boolean; 
  message?: string; 
  applicationId?: string;
}> => {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.jobTitle || !data.jobId || !data.userId) {
      throw new Error('Missing required application fields');
    }

    // Email format validation
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Additional validation for university program
    if (data.jobId === 'university-talent-program') {
      if (!data.university || !data.graduationYear || !data.currentYear || !data.preferredField) {
        throw new Error('Please fill all university program fields');
      }
    }

    // Prepare metadata
    const metadata = {
      userAgent: navigator.userAgent.substring(0, 500),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || null,
      isUniversityProgram: data.jobId === 'university-talent-program',
      ipAddress: null // Can be added if you collect this
    };

    // Submit to dedicated path
    const applicationRef = push(ref(db, 'model1Applications'));
    
    const applicationData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      message: data.message?.trim() || null,
      jobTitle: data.jobTitle.trim(),
      jobId: String(data.jobId).trim(),
      resumeUrl: data.resumeUrl || null,
      userId: data.userId,
      // Optional professional fields
      linkedIn: data.linkedIn?.trim() || null,
      portfolio: data.portfolio?.trim() || null,
      salaryExpectation: data.salaryExpectation?.trim() || null,
      // University-specific fields
      university: data.university?.trim() || null,
      graduationYear: data.graduationYear ? String(data.graduationYear).trim() : null,
      currentYear: data.currentYear ? String(data.currentYear).trim() : null,
      preferredField: data.preferredField?.trim() || null,
      // System fields
      status: 'submitted',
      timestamp: serverTimestamp(),
      metadata,
      theme: data.theme || 'default'
    };

    await set(applicationRef, applicationData);

    return { 
      success: true,
      message: "Application submitted successfully",
      applicationId: applicationRef.key
    };
  } catch (error: any) {
    console.error("Model1 Application Error:", error);
    return { 
      success: false,
      message: error.message || "Failed to submit application"
    };
  }
};

/**
 * Dedicated uploader for Application Model 1 resumes
 */
export const uploadModel1Resume = async (
  file: File,
  userId: string
): Promise<{ success: boolean; downloadURL?: string; error?: string; fileId?: string }> => {
  try {
    // Validate file type and size
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      throw new Error('Only PDF, DOC, and DOCX files are allowed');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    // Create storage reference - CRITICAL FIX: Use storageRef explicitly
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `model1Applications/resumes/${userId}/${timestamp}_${sanitizedName}`;
    
    // Use storageRef (imported as storageRef from firebase/storage)
    const fileRef = storageRef(storage, filePath);

    const uploadTask = await uploadBytes(fileRef, file, {
      contentType: file.type,
      customMetadata: {
        userId,
        originalName: file.name,
        uploadTime: timestamp.toString(),
        applicationType: 'model1'
      }
    });

    const downloadURL = await getDownloadURL(fileRef);
    
    return { 
      success: true, 
      downloadURL,
      fileId: uploadTask.ref.name
    };
  } catch (error: any) {
    console.error("Detailed Resume Upload Error:", {
      error: error.message,
      stack: error.stack,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type
    });
    return { 
      success: false, 
      error: error.message || "Failed to upload resume" 
    };
  }
};





export const submitConsultationForm = async (data: { 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry?: Record<string, boolean>;
  services?: Record<string, boolean>;
  additionalInfo?: string;
  calBookingData?: {  // New Cal.com booking data
    eventId?: string;
    bookingId?: string;
    startTime?: string;
    endTime?: string;
    timeZone?: string;
    meetingUrl?: string;
  }
}): Promise<{ success: boolean; message?: string }> => {
  try {
    // Prepare Firebase data - remove undefined values
    const submissionData: Record<string, any> = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.replace(/\D/g, ''),
      company: data.company.trim(),
      timestamp: Date.now(),
      services: data.services ? Object.keys(data.services).join(', ') : 'None selected',
      additionalInfo: data.additionalInfo || '',
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname,
        source: 'cal.com'
      }
    };

    // Add Cal.com data only if it exists and has values
    if (data.calBookingData) {
      const calData: Record<string, any> = {};
      
      // Only add defined values to calData
      if (data.calBookingData.eventId) calData.eventId = data.calBookingData.eventId;
      if (data.calBookingData.bookingId) calData.bookingId = data.calBookingData.bookingId;
      if (data.calBookingData.startTime) calData.startTime = data.calBookingData.startTime;
      if (data.calBookingData.endTime) calData.endTime = data.calBookingData.endTime;
      if (data.calBookingData.timeZone) calData.timeZone = data.calBookingData.timeZone;
      if (data.calBookingData.meetingUrl) calData.meetingUrl = data.calBookingData.meetingUrl;
      
      // Only add calEvent if we have any data
      if (Object.keys(calData).length > 0) {
        submissionData.calEvent = calData;
      }
    }

    const submissionRef = push(ref(db, 'consultationSubmissions'));
    await set(submissionRef, submissionData);

    return {
      success: true,
      message: "Your information has been submitted successfully!"
    };

  } catch (error: any) {
    console.error("Submission error:", error);
    return {
      success: false,
      message: error.message || "Submission failed. Please try again."
    };
  }
};
