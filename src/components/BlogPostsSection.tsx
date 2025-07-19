import { BlogPost } from '@/types/blog';
import BlogPostCard from './BlogPostCard';

interface BlogPostsSectionProps {
  posts: BlogPost[];
  title?: string;
}

export default function BlogPostsSection({ 
  posts, 
  title = "Insights & Resources" 
}: BlogPostsSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="p-5">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}