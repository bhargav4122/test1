import { submitBlogPostWithZapier } from "@/firebase";

// Replace this with the same data you added to blogPosts.ts
const newBlog = {
  title: "How to Use AI in Business",
  content: "This blog post explores practical AI use cases in small businesses...",
  category: "AI Insights",
  tags: ["AI", "Business", "Tips"],
  author: "Bhargav Allu"
};

submitBlogPostWithZapier(newBlog)
  .then(() => console.log("✅ Blog sync triggered"))
  .catch((err) => console.error("❌ Sync error:", err));
