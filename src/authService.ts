import { auth, provider, signInWithPopup, set, ref, db } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optional: Store user details in your DB
    await set(ref(db, `users/${user.uid}`), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      joined: Date.now(),
    });

    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    };
  } catch (error) {
    console.error("Google login failed", error);
    return null;
  }
};
