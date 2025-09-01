export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Blog CMS Platform</h3>
            <p className="text-gray-400 mb-4">
              A modern blog platform built with Next.js and powered by Cosmic CMS. 
              Discover the latest insights in technology, travel, and lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories/technology" className="hover:text-white transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="/categories/travel" className="hover:text-white transition-colors">
                  Travel
                </a>
              </li>
              <li>
                <a href="/categories/lifestyle" className="hover:text-white transition-colors">
                  Lifestyle
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Powered by Cosmic
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Built with Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Blog CMS Platform. Built with Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}