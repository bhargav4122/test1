import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Data Analytics in 2024",
      excerpt: "Exploring the latest trends and technologies shaping data analytics this year.",
      category: "Data Science",
      date: "May 15, 2024",
      readTime: "5 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Optimizing Business Processes with AI",
      excerpt: "How artificial intelligence is revolutionizing operational efficiency across industries.",
      category: "Artificial Intelligence",
      date: "April 28, 2024",
      readTime: "7 min read",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices for Remote Teams",
      excerpt: "Essential security measures to protect your distributed workforce in 2024.",
      category: "Cybersecurity",
      date: "April 10, 2024",
      readTime: "4 min read",
      author: "David Rodriguez",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Cloud Migration Strategies for Enterprises",
      excerpt: "A comprehensive guide to transitioning your business infrastructure to the cloud.",
      category: "Cloud Computing",
      date: "March 22, 2024",
      readTime: "8 min read",
      author: "Emily Wilson",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    },
    {
      id: 5,
      title: "The Rise of Edge Computing in IoT",
      excerpt: "How edge computing is solving latency challenges in IoT deployments.",
      category: "Emerging Tech",
      date: "March 5, 2024",
      readTime: "6 min read",
      author: "Robert Kim",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      title: "Building Scalable Microservices Architecture",
      excerpt: "Key principles and patterns for designing robust microservices systems.",
      category: "Software Engineering",
      date: "February 18, 2024",
      readTime: "9 min read",
      author: "Jessica Lee",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  // Popular tags
  const popularTags = [
    "Data Science", "AI", "Cloud", "Security", 
    "DevOps", "IoT", "Blockchain", "Analytics"
  ];

  // Categories
  const categories = [
    { name: "Technology", count: 12 },
    { name: "Business", count: 8 },
    { name: "Data Analytics", count: 15 },
    { name: "Software Development", count: 10 },
    { name: "Cybersecurity", count: 7 }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">BDS Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, research, and thought leadership from our team of experts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Posts Section */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-background rounded-xl border border-border overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          Read more <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                  1
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search */}
            <div className="group relative mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-background rounded-lg border border-border p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-primary">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="group relative mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-background rounded-lg border border-border p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                        className="flex justify-between items-center text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        <span>{category.name}</span>
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="group relative mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-background rounded-lg border border-border p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-primary">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blog/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-background rounded-lg border border-border p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-primary">Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to get notified about new articles and insights.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage2;