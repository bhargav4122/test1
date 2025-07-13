import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import blogPosts from "./src/data/blogPostsData.js"; // make sure this file also uses `export default`

const firebaseConfig = {
  apiKey: "AIzaSyBMpPPikDjkhr5EtcbV6BPojX9uWx8Zc20",
  authDomain: "bds-db-7f03a.firebaseapp.com",
  databaseURL: "https://bds-db-7f03a-default-rtdb.firebaseio.com",
  projectId: "bds-db-7f03a",
  storageBucket: "bds-db-7f03a.appspot.com",
  messagingSenderId: "1078036560341",
  appId: "1:1078036560341:web:af9dbea209736880ca255c",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function uploadBlogPosts() {
  for (const post of blogPosts) {
    const newRef = push(ref(db, "blogPosts"));
    await set(newRef, post);
    console.log(`✅ Uploaded: ${post.title}`);
  }
}

uploadBlogPosts();
