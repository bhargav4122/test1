import React, { useState, useEffect, useMemo } from "react";
import { Card } from "../components/ui/card";
import BlogCard from "../components/Blog/BlogCard";
import BlogFilterSidebar from "../components/Blog/BlogFilterSidebar";
import { fetchBlogPosts } from "@/firebase/blogService";

// Hard coded inline styles
const layoutContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
};

const contentStyle = {
  width: "76.66%", // roughly two-thirds of the container
};

const sidebarStyle = {
  width: "23.33%", // roughly one-third of the container
};

const heroStyle = {
  background: "linear-gradient(to right, rgba(59,130,246,0.1), rgba(16,185,129,0.1))",
  padding: "0px 0",
  textAlign: "center",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0px",
};

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

        const validatedPosts = posts.map((post) => ({
          ...post,
          title: post.title || "Untitled Post",
          content: post.content || "",
          category: post.category || "Uncategorized",
          tags: Array.isArray(post.tags) ? post.tags : [],
        }));

        setBlogPosts(validatedPosts);

        // Extract categories and tags
        const catMap = {};
        const tagSet = new Set();

        validatedPosts.forEach((post) => {
          const name = post.category.trim();
          catMap[name] = (catMap[name] || 0) + 1;
          post.tags.forEach((tag) => {
            if (typeof tag === "string") {
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
        const titleLower = (post.title || "").toLowerCase();
        const contentLower = (post.content || "").toLowerCase();
        const categoryLower = (post.category || "").toLowerCase();
        const selectedCategoryLower = selectedCategory.toLowerCase();
        const selectedTagLower = selectedTag.toLowerCase();

        const matchesSearch = searchTerm
          ? titleLower.includes(searchLower) || contentLower.includes(searchLower)
          : true;

        const matchesCategory = selectedCategory
          ? categoryLower === selectedCategoryLower
          : true;

        const matchesTag = selectedTag
          ? (post.tags || []).some((tag) => String(tag).toLowerCase() === selectedTagLower)
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
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", color: "red" }}>Error</h2>
          <p style={{ marginBottom: "1rem" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "8px 16px", backgroundColor: "#2563EB", color: "#fff", border: "none", borderRadius: "4px" }}
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
   <div className=" text-foreground min-h-screen">

      {/* Hero */}
      <div style={heroStyle}>
        <div className=" pt-20 dark:bg-black dark:text-gray-100">

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary ">BDS Insights</h1>
          <p style={{ fontSize: "1.25rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto" }}>
            Discover the latest trends, research, and thought leadership from our team of experts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        <div style={layoutContainerStyle}>
          {/* Blog Posts Section */}
          <div style={contentStyle}>
             <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary pt-10">Latest Articles</h2>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p>Loading posts...</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {filteredPosts.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <p>No posts found matching your criteria.</p>
                    <button
                      onClick={handleClearFilters}
                      style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "transparent", color: "#2563EB", textDecoration: "underline", border: "none" }}
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <Card key={post.id} style={{ padding: "16px" }}>
                      <BlogCard post={post} />
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div style={sidebarStyle}>
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
