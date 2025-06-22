import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, serverTimestamp, set } from "firebase/database";

// Debug check
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

console.log("Firebase Config Verification:", {
  apiKey: firebaseConfig.apiKey?.substring(0, 6) + '...', // Now using the defined config
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const submitForm = async (formName: string, data: object) => {
  try {
    const submissionRef = ref(db, `submissions/${formName}/${Date.now()}`);
    await set(submissionRef, {
      ...data,
      timestamp: serverTimestamp(),
      metadata: {
        userAgent: navigator.userAgent.substring(0, 120),
        screenResolution: `${window.screen.width}x${window.screen.height}`
      }
    });
    return true;
  } catch (error) {
    console.error("Firebase Error Details:", {
      code: error.code,
      message: error.message,
      config: {
        dbURL: firebaseConfig.databaseURL,
        time: new Date().toISOString()
      }
    });
    return false;
  }
};