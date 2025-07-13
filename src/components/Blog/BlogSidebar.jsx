import React, { useState } from "react";
import { submitNewsletterEmail } from "@/firebase";

const BlogFilterSidebar = ({
  onSearch,
  searchTerm,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  onClearFilters,
  categories,
  tags,
}) => {
  // ✨ Local state for subscription input
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribed(false);
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    const success = await submitNewsletterEmail(email);
    if (success) {
      setSubscribed(true);
      setEmail("");
    } else {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <aside className="space-y-8">
      {/* Search + Clear Filters */}
      <div className="p-6 rounded-lg border border-border bg-muted/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Search</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-primary underline hover:text-primary/80 transition-colors"
          >
            Clear Filters
          </button>
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="p-6 rounded-lg border border-border bg-muted/10">
        <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
        <ul className="space-y-2">
       {categories.map((category, index) => (
  <li
    key={index}
    onClick={() => onCategoryChange(category.name)} // Also changed here to pass just the name
    className={`flex justify-between items-center cursor-pointer py-2 border-b border-border/50 hover:text-primary ${
      selectedCategory === category.name ? "text-primary font-medium" : "text-muted-foreground"
    }`}
  >
    <span>{category.name}</span> {/* Fixed: now rendering just the name */}
    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
      {category.count}
    </span>
  </li>
))}
        </ul>
      </div>

      {/* Tags */}
      <div className="p-6 rounded-lg border border-border bg-muted/10">
        <h3 className="text-lg font-semibold mb-4 text-primary">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagChange(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="p-6 rounded-lg border border-border bg-muted/10">
        <h3 className="text-lg font-semibold mb-4 text-primary">Newsletter</h3>
        <p className="text-muted-foreground mb-4">
          Subscribe to get notified about new articles and insights.
        </p>
        <form className="space-y-3" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Subscribe
          </button>
          {subscribed && <p className="text-sm text-green-600">Thank you for subscribing!</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </aside>
  );
};

export default BlogFilterSidebar;
