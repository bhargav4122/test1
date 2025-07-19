import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const BlogCard = ({ post }) => {
  return (
    <article className="w-full h-full flex flex-col">
  <img 
    src={post.image} 
    alt={post.title}
    className="w-full h-48 object-cover rounded-t-md"
  />
  <div className="p-6 flex-1 flex flex-col">
    <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
      {post.category}
    </span>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{post.title}</h3>
    <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>

    <div className="flex items-center justify-between mt-auto text-sm text-muted-foreground">
      <div className="flex items-center space-x-4">
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
        className="flex items-center text-primary hover:text-primary/80"
      >
        Read more <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  </div>
</article>

  );
};

export default BlogCard;