export const blogPosts = [
  {
    id: 1,
    title: "The Future of Cloud Infrastructure: Trends to Watch",
    excerpt: "Explore the emerging trends shaping cloud infrastructure, including edge computing, serverless architectures, and AI integration.",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80",
    categories: ["cloud", "infrastructure"],
    date: "2023-10-15",
    slug: "future-of-cloud-infrastructure"
  },
  {
    id: 2,
    title: "Securing Your Cloud: Best Practices for Modern Businesses",
    excerpt: "Implementing robust security measures in cloud environments requires a comprehensive approach. Learn about the latest security best practices.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    categories: ["cloud", "security"],
    date: "2023-09-22",
    slug: "securing-your-cloud"
  },
  {
    id: 3,
    title: "Cost Optimization Strategies for Cloud Infrastructure",
    excerpt: "Discover how to minimize cloud spending without sacrificing performance or reliability through effective resource management.",
    image: "https://images.unsplash.com/photo-1541323484797-549d5c0a9438?auto=format&fit=crop&q=80",
    categories: ["cloud", "cost-optimization"],
    date: "2023-08-10",
    slug: "cost-optimization-cloud"
  }
];

// Helper function to get posts by category
export const getPostsByCategory = (category) => {
  return blogPosts.filter(post => post.categories.includes(category));
};

// Helper function to get latest posts
export const getLatestPosts = (limit = 3) => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};