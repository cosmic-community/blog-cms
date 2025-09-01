'use client'

import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
      >
        All Categories
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="px-4 py-2 text-sm font-medium rounded-full hover:opacity-80 transition-opacity text-white"
          style={{
            backgroundColor: category.metadata.color || '#6b7280'
          }}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}