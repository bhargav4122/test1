// services/blogService.ts
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const fetchBlogPosts = async () => {
  const snapshot = await get(ref(db, "blogPosts"));
  const posts: any[] = [];
  if (snapshot.exists()) {
    const data = snapshot.val();
    for (const key in data) {
      posts.push({ id: key, ...data[key] });
    }
  }
  return posts;
};
