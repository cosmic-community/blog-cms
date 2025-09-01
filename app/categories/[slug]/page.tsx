// app/categories/[slug]/page.tsx
import { getCategories, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} Articles`,
    description: category.metadata.description || `Browse all articles in the ${category.title} category`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <header className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <CategoryBadge category={category} size="lg" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.title} Articles
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.metadata.description}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            No articles yet
          </h2>
          <p className="text-gray-600">
            Check back later for new {category.title.toLowerCase()} content!
          </p>
        </div>
      )}
    </div>
  )
}