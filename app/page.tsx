import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function Home() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])

  const regularPosts = posts.filter(post => !post.metadata.featured)
  const mainFeaturedPost = featuredPosts[0]

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Post Section */}
      {mainFeaturedPost && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Article</h2>
              <p className="text-gray-600 mt-2">Don't miss our latest featured content</p>
            </div>
            <FeaturedPost post={mainFeaturedPost} />
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <p className="text-gray-600 mt-2">Discover our latest insights and stories</p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8">
              <CategoryFilter categories={categories} />
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {regularPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Check back later for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}