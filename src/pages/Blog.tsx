import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Business Intelligence: Trends to Watch in 2024",
      excerpt: "Discover the emerging trends that are shaping the future of business intelligence and how your organization can stay ahead.",
      author: "Sarah Chen",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Industry Insights",
      featured: true
    },
    {
      title: "Data Integration Best Practices for Modern Enterprises",
      excerpt: "Learn how to effectively integrate data from multiple sources to create a unified view of your business operations.",
      author: "Michael Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Technical Guide"
    },
    {
      title: "ROI of Business Intelligence: Measuring Success",
      excerpt: "Understanding how to calculate and maximize the return on investment from your business intelligence initiatives.",
      author: "Emma Thompson",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Business Strategy"
    },
    {
      title: "AI-Powered Analytics: Transforming Decision Making",
      excerpt: "Explore how artificial intelligence is revolutionizing business analytics and enabling smarter decision-making processes.",
      author: "David Kim",
      date: "November 28, 2024",
      readTime: "8 min read",
      category: "AI & Machine Learning"
    },
    {
      title: "Cloud Migration for Data Platforms: A Complete Guide",
      excerpt: "Step-by-step guidance for successfully migrating your data infrastructure to the cloud while maintaining security and performance.",
      author: "Lisa Johnson",
      date: "November 20, 2024",
      readTime: "10 min read",
      category: "Cloud Computing"
    }
  ];

  const categories = ["All", "Industry Insights", "Technical Guide", "Business Strategy", "AI & Machine Learning", "Cloud Computing"];

  return (
    <div className="min-h-screen flex flex-col">
    
      
      <main className="flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-6">DataSphere Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and best practices in data analytics, 
              business intelligence, and digital transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer ${
                  post.featured ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className={`bg-gradient-to-r from-primary to-secondary ${post.featured ? 'h-64' : 'h-48'}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h2 className={`font-semibold mb-3 group-hover:text-primary transition-colors ${
                    post.featured ? 'text-2xl' : 'text-xl'
                  }`}>
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button size="lg">
              Load More Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </main>
      
    </div>
  );
};

export default Blog;