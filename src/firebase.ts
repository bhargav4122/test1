import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

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
const db = getDatabase(app);

// Existing function for call-to-action form submissions
export const submitForm = async (formName: string, data: any) => {
  try {
    const submissionRef = ref(db, `submissions/${formName}/${Date.now()}`);
    await set(submissionRef, {
      ...data,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`
      }
    });
    return true;
  } catch (error: any) {
    console.error("Firebase Error:", error);
    return false;
  }
};

// New function for contact form submissions
export const submitContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  services: string[];
  message: string;
}) => {
  try {
    const contactRef = ref(db, `contactSubmissions/${Date.now()}`);
    await set(contactRef, {
      ...data,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.pathname
      }
    });
    return true;
  } catch (error: any) {
    console.error("Firebase Contact Error:", error);
    return false;
  }
};

// Add this alongside your existing submitContactForm function
export const submitConsultationForm = async (formData: any) => {
  try {
    // Validate required fields (unchanged)
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.company || !formData.date || !formData.timeSlot) {
      throw new Error("Missing required fields");
    }

    // ✅ Simplified payload - no array conversion needed
    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      industry: formData.industry || [], // Keep as array
      services: formData.services || [],  // Keep as array
      additionalInfo: formData.additionalInfo || "",
      date: formData.date,
      timeSlot: formData.timeSlot,
      timestamp: Date.now(),
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        page: window.location.href
      }
    };

    // ✅ Correct modular syntax
    const consultationRef = ref(db, 'consultationSubmissions');
    const newRef = push(consultationRef); // Generates unique ID
    await set(newRef, submissionData);
    
    return true;
  } catch (error) {
    console.error("Firebase submission error:", error);
    throw error;
  }
};