import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  showAuthor?: boolean
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const publishDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={post.title}
            width={600}
            height={300}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
      )}

      <div className="p-6">
        {/* Categories */}
        {post.metadata.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.metadata.categories.slice(0, 2).map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-accent transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {showAuthor && post.metadata.author && (
              <>
                {post.metadata.author.metadata?.profile_picture && (
                  <img
                    src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                )}
                <Link 
                  href={`/authors/${post.metadata.author.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {post.metadata.author.title}
                </Link>
              </>
            )}
          </div>
          <time dateTime={post.metadata.publication_date}>
            {publishDate}
          </time>
        </div>

        {/* Featured Badge */}
        {post.metadata.featured && (
          <div className="mt-3">
            <span className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
    </article>
  )
}