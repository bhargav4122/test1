import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { db } from "../firebase/config";

export const checkIfClientExists = async (email: string): Promise<boolean> => {
  const dbRef = ref(db, 'consultationSubmissions');
  const clientQuery = query(dbRef, orderByChild('email'), equalTo(email.toLowerCase()));

  const snapshot = await get(clientQuery);
  return snapshot.exists();
};
