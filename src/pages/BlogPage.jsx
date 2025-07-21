import React, { useState, useEffect, useMemo } from "react";
import { Card } from "../components/ui/card";
import BlogCard from "../components/Blog/BlogCard";
import { fetchBlogPosts } from "@/firebase/blogService";

// ... import statements remain the same

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchBlogPosts();

        const validated = posts.map((post) => ({
          ...post,
          title: post.title || "Untitled Post",
          content: post.content || "",
          category: post.category || "Uncategorized",
          tags: Array.isArray(post.tags) ? post.tags : [],
        }));

        setBlogPosts(validated);

        const tagSet = new Set();
        validated.forEach((post) => {
          post.tags.forEach((tag) => {
            if (typeof tag === "string") tagSet.add(tag.trim());
          });
        });

        setTags([...tagSet]);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const s = searchTerm.toLowerCase();
      const matchSearch =
        post.title.toLowerCase().includes(s) ||
        post.content.toLowerCase().includes(s);
      const matchTag = selectedTag
        ? post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
        : true;

      return matchSearch && matchTag;
    });
  }, [blogPosts, searchTerm, selectedTag]);

  const handleSearch = (val) => setSearchTerm(val);
  const handleTagChange = (val) => setSelectedTag(val);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
  };

  return (
    <div className="min-h-screen text-foreground pt-20">
      {/* Header */}
      <div className="text-center py-12 px-4 bg-gradient-to-r from-blue-100/20 to-green-100/20 dark:bg-black">
        <h1 className="text-4xl font-bold text-primary mb-2">BDS Insights</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore insights, trends, and analysis from our experts.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mt-8 px-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-10">
        {loading ? (
          <div className="text-center py-10">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p>No blog posts found.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-4">
                <BlogCard post={post} />
              </Card>
            ))}
          </div>
        )}

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4 text-primary text-center">
              Filter by Tag
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-sm underline text-muted-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
