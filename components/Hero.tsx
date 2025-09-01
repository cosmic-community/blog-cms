export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to Our Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the latest insights in technology, travel, and lifestyle. 
            Join us on a journey of exploration and learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#latest-articles"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors"
            >
              Explore Articles
            </a>
            <a
              href="/categories/technology"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors"
            >
              Browse Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}