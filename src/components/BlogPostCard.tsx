import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block h-full"
    >
      <article className="relative flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 ease-out">

        {/* Image Container with Zoom Effect */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md text-foreground border-white/20 shadow-sm px-3 py-1 text-xs font-semibold tracking-wide">
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-6 relative">

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title with Gradient Hover */}
          <h3 className="text-xl font-bold text-card-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Placeholder for author avatars if available, otherwise just text "Read Article" */}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
              Read Article
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
