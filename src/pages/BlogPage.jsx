import React, { useState, useEffect, useMemo } from "react";
import { Card } from "../components/UI/card";
import BlogCard from "../components/Blog/BlogCard";
import BlogFilterSidebar from "../components/Blog/BlogFilterSidebar";
import { fetchBlogPosts } from "@/firebase/blogService";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const posts = await fetchBlogPosts();
        
        // Validate and normalize posts data
        const validatedPosts = posts.map(post => ({
          ...post,
          title: post.title || 'Untitled Post',
          content: post.content || '',
          category: post.category || 'Uncategorized',
          tags: Array.isArray(post.tags) ? post.tags : [],
        }));

        setBlogPosts(validatedPosts);

        // Extract categories
        const catMap = {};
        const tagSet = new Set();

        validatedPosts.forEach((post) => {
          const name = post.category.trim();
          catMap[name] = (catMap[name] || 0) + 1;

          post.tags.forEach((tag) => {
            if (typeof tag === 'string') {
              tagSet.add(tag.trim());
            }
          });
        });

        const extractedCategories = Object.entries(catMap).map(([name, count]) => ({
          name,
          count,
        }));

        setCategories(extractedCategories);
        setTags([...tagSet]);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    try {
      return blogPosts.filter((post) => {
        const searchLower = searchTerm.toLowerCase();
        const titleLower = (post.title || '').toLowerCase();
        const contentLower = (post.content || '').toLowerCase();
        const categoryLower = (post.category || '').toLowerCase();
        const selectedCategoryLower = selectedCategory.toLowerCase();
        const selectedTagLower = selectedTag.toLowerCase();

        const matchesSearch = searchTerm
          ? titleLower.includes(searchLower) || 
            contentLower.includes(searchLower)
          : true;

        const matchesCategory = selectedCategory
          ? categoryLower === selectedCategoryLower
          : true;

        const matchesTag = selectedTag
          ? (post.tags || []).some(tag => 
              String(tag).toLowerCase() === selectedTagLower
            )
          : true;

        return matchesSearch && matchesCategory && matchesTag;
      });
    } catch (err) {
      console.error("Filtering error:", err);
      return [];
    }
  }, [blogPosts, searchTerm, selectedCategory, selectedTag]);

  const handleSearch = (value) => setSearchTerm(value);
  const handleCategoryChange = (value) => setSelectedCategory(value);
  const handleTagChange = (value) => setSelectedTag(value);
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  if (error) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">BDS Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, research, and thought leadership from our team of experts.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Blog Posts */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Latest Articles</h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading posts...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">No posts found matching your criteria.</p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 px-4 py-2 text-primary underline hover:text-primary/80"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <Card key={post.id}>
                      <BlogCard post={post} />
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <BlogFilterSidebar
              onSearch={handleSearch}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedTag={selectedTag}
              onTagChange={handleTagChange}
              onClearFilters={handleClearFilters}
              categories={categories}
              tags={tags}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;