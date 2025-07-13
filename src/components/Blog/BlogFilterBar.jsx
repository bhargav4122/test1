// BlogFilterBar.jsx
import React, { useState } from "react";

const BlogFilterBar = ({ categories, tags, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter({ searchTerm: value, selectedCategory, selectedTags });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter({ searchTerm, selectedCategory: value, selectedTags });
  };

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onFilter({ searchTerm, selectedCategory, selectedTags: updatedTags });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTags([]);
    onFilter({ searchTerm: "", selectedCategory: "", selectedTags: [] });
  };

  return (
    <div className="sticky top-0 z-20 bg-background p-4 border-b border-border mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search posts..."
          className="flex-grow px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors hover:bg-primary/20 ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="ml-auto px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/70"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BlogFilterBar;
