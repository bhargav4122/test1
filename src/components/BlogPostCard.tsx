import { BlogPost } from '@/types/blog';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow bg-white shadow-lg rounded-xl dark:bg-black dark:text-gray-100">
      {post.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
      </CardContent>
      <div className="p-4 pt-0 mt-auto border-border">
        <Button variant="link" className="w-full justify-start px-0 text-primary">
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}