// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
}

// Author interface with typed metadata
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    profile_picture?: {
      url: string;
      imgix_url: string;
    };
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Category interface with typed metadata
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    color?: string;
  };
}

// Post interface with typed metadata
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    excerpt?: string;
    author: Author;
    categories?: Category[];
    publication_date: string;
    featured: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type PostWithoutId = Omit<Post, 'id' | 'created_at' | 'modified_at'>;