import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { app } from '@/firebase'; // Your Firebase config

export const useJobApplicationAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      // Add any additional scopes you need
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, signIn };
};