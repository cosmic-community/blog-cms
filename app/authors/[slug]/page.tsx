// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `Articles by ${author.title}`,
    description: author.metadata.bio || `Browse all articles written by ${author.title}`,
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Header */}
      <header className="text-center mb-12">
        {author.metadata.profile_picture && (
          <div className="flex justify-center mb-6">
            <img
              src={`${author.metadata.profile_picture.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.title}
              width={200}
              height={200}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {author.title}
        </h1>
        
        {author.metadata.bio && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {author.metadata.website && (
            <a
              href={author.metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-medium"
            >
              Website
            </a>
          )}
          {author.metadata.twitter && (
            <a
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-medium"
            >
              Twitter
            </a>
          )}
          {author.metadata.linkedin && (
            <a
              href={author.metadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-medium"
            >
              LinkedIn
            </a>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showAuthor={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            No articles yet
          </h2>
          <p className="text-gray-600">
            {author.title} hasn't published any articles yet. Check back later!
          </p>
        </div>
      )}
    </div>
  )
}