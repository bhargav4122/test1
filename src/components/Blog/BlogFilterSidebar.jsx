import React, { useState } from "react";
import { submitNewsletterEmail } from "@/firebase";
import { validateEmail } from '@/utils/emailValidation';



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

    if (!validateEmail(email)) {
    setError("Please provide a valid business/work email address");
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

    {/* Newsletter Subscription */}
      <div className="p-6 border rounded-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-background"
            required
          />
          <button
            type="submit"
            disabled={!email || subscribed}
            className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {subscribed && (
            <p className="text-green-500 text-sm">Thanks for subscribing!</p>
          )}
        </form>
      </div>
    </aside>
  );
};

export default BlogFilterSidebar;
