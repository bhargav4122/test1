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
  
} from "firebase/database";


import {getStorage, ref as storageRef,  // This is the correct import for storage references
  uploadBytesResumable, 
  getDownloadURL } from "firebase/storage";
//import { storage, uploadBytes, getDownloadURL } from '@/firebase/firebaseConfig';

import axios from "axios";

import { validateEmail } from '@/utils/emailValidation';

import { format } from 'date-fns';



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




export const submitConsultationForm = async (data: { 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  date: string; // Format: YYYY-MM-DD
  timeSlot: string; // Format: "HH:MM AM/PM"
  industry?: Record<string, boolean>;
  services?: Record<string, boolean>;
  additionalInfo?: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    // 1. Generate meeting ID and link (Google Meet alternative)
    const meetingId = `ds-${Math.random().toString(36).substring(2, 8)}`;
    const meetLink = `https://meet.datasolutions.com/${meetingId}`; // Replace with your actual meeting domain

    // 2. Convert time with proper timezone handling
    const [time, period] = data.timeSlot.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const dateParts = data.date.split('-');
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Create date in user's timezone
    const startDate = new Date(Date.UTC(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2]),
      hours,
      minutes
    ));
    
    // Adjust for timezone offset
    const tzOffset = startDate.getTimezoneOffset() * 60 * 1000;
    const localStartDate = new Date(startDate.getTime() - tzOffset);
    const localEndDate = new Date(localStartDate.getTime() + 45 * 60 * 1000); // 45 minute meeting

    // 3. Prepare Firebase data
    const submissionData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.replace(/\D/g, ''),
      company: data.company.trim(),
      date: data.date,
      timeSlot: data.timeSlot,
      startTimeUTC: localStartDate.toISOString(),
      endTimeUTC: localEndDate.toISOString(),
      userTimezone: timeZone,
      meetingLink: meetLink,
      meetingId: meetingId,
      timestamp: Date.now(),
      services: data.services ? Object.keys(data.services).join(', ') : 'None selected',
      additionalInfo: data.additionalInfo || '',
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname
      }
    };

    const submissionRef = push(ref(db, 'consultationSubmissions'));
    await set(submissionRef, submissionData);

    // 4. Send to Zapier with corrected time format
    const formData = new URLSearchParams();
    // Core fields
    formData.append('firstName', submissionData.firstName);
    formData.append('lastName', submissionData.lastName);
    formData.append('email', submissionData.email);
    formData.append('phone', submissionData.phone);
    formData.append('company', submissionData.company);
    formData.append('services', submissionData.services);
    
    // Time fields (corrected)
    formData.append('start_time_utc', submissionData.startTimeUTC);
    formData.append('end_time_utc', submissionData.endTimeUTC);
    formData.append('user_timezone', submissionData.userTimezone);
    formData.append('user_date', data.date);
    formData.append('user_time', data.timeSlot);
    
    // Meeting info
    formData.append('meeting_title', `Consultation with ${data.firstName} ${data.lastName}`);
    formData.append('meeting_description', `45-min consultation for ${data.company}`);
    
    // System fields
    formData.append('firebaseId', submissionRef.key || '');

    const response = await fetch('https://hooks.zapier.com/hooks/catch/23697085/u3jdp83/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

const zapResult = await response.json(); // Zap should return real link

const realMeetLink = zapResult.meeting_link || meetLink; // fallback to fake if missing

// Update Firebase with real meet link
await update(ref(db, `consultationSubmissions/${submissionRef.key}`), {
  meetingLink: realMeetLink,
  googleEventId: zapResult.event_id || null
});


    if (!response.ok) throw new Error('Calendar integration failed');

    return {
      success: true,
      message: "Booking confirmed! Check your email for details."
    };

  } catch (error: any) {
    console.error("Submission error:", error);
    return {
      success: false,
      message: error.message || "Booking failed. Please try again."
    };
  }
};


//firebase 

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