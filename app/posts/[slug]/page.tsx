// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata.excerpt || 'Read this blog post',
    openGraph: {
      title: post.title,
      description: post.metadata.excerpt || 'Read this blog post',
      images: post.metadata.featured_image?.imgix_url 
        ? [`${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const publishDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          {post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.metadata.categories.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.metadata.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-6">
          <time dateTime={post.metadata.publication_date}>
            {publishDate}
          </time>
          {post.metadata.featured && (
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata.featured_image && (
        <div className="mb-8">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
      </div>

      {/* Author */}
      <div className="border-t border-gray-200 pt-8">
        <AuthorCard author={post.metadata.author} />
      </div>
    </article>
  )
}