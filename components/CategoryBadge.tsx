import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md' | 'lg'
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const textColor = category.metadata.color ? 'text-white' : 'text-gray-700'
  const bgColor = category.metadata.color || '#e5e7eb'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block ${sizeClasses[size]} rounded-full font-medium hover:opacity-80 transition-opacity`}
      style={{
        backgroundColor: bgColor,
        color: category.metadata.color ? 'white' : '#374151'
      }}
    >
      {category.title}
    </Link>
  )
}