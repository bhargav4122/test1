export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  slug?: string;
  date?: string;
  categories?: string[];
    content: string;
  serviceIds?: string[]; // Links to services
  relatedPosts?: number[]; // Links to related posts
  tags: string[];

}

export interface ServiceDetails {
  id: string;
  title: string;
  description: string;
  blogPosts?: BlogPost[];
  category?: string;
}