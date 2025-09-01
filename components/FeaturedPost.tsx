import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const publishDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="lg:flex">
        {/* Image */}
        {post.metadata.featured_image && (
          <div className="lg:w-1/2">
            <Link href={`/posts/${post.slug}`}>
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
        )}

        {/* Content */}
        <div className="lg:w-1/2 p-8">
          {/* Categories */}
          {post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.metadata.categories.slice(0, 2).map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          )}

          {/* Featured Badge */}
          <div className="mb-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured Article
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-accent transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {post.metadata.excerpt && (
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {post.metadata.author?.metadata?.profile_picture && (
                <img
                  src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              )}
              <div>
                <Link 
                  href={`/authors/${post.metadata.author.slug}`}
                  className="font-medium text-gray-900 hover:text-accent transition-colors"
                >
                  {post.metadata.author.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {publishDate}
                </p>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-6">
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Read full article
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}