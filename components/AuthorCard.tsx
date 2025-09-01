import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
      
      <div className="flex items-start space-x-4">
        {/* Profile Picture */}
        {author.metadata.profile_picture && (
          <Link href={`/authors/${author.slug}`}>
            <img
              src={`${author.metadata.profile_picture.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={author.title}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
        )}

        <div className="flex-1">
          {/* Name */}
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            <Link 
              href={`/authors/${author.slug}`}
              className="hover:text-accent transition-colors"
            >
              {author.title}
            </Link>
          </h4>

          {/* Bio */}
          {author.metadata.bio && (
            <p className="text-gray-600 mb-3 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex space-x-4">
            {author.metadata.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                Website
              </a>
            )}
            {author.metadata.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                Twitter
              </a>
            )}
            {author.metadata.linkedin && (
              <a
                href={author.metadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}