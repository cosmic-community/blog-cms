# Blog CMS Platform

![App Preview](https://imgix.cosmicjs.com/44c2bf40-875c-11f0-8dcc-651091f6a7c0-photo-1677442136019-21780ecad995-1756749080520.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 15 that showcases your blog posts, authors, and categories with a clean, professional design.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 📝 Dynamic blog post listing and individual post pages
- 👤 Author profiles with social links and bio information
- 🏷️ Category-based filtering and organization
- 🖼️ Optimized image handling with imgix integration
- 📱 Mobile-first responsive design
- 🚀 Fast performance with Next.js 15 and server components
- 🎨 Category color coding for better organization

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience  
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Headless CMS integration
- **React Markdown** - Markdown content rendering
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-cms-platform
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
// Fetch all posts with authors and categories
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);

// Get a specific post by slug
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1);

// Fetch posts by category
const categoryPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .depth(1);
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket's content model:

- **Posts** - Blog articles with markdown content, featured images, authors, and categories
- **Authors** - Writer profiles with bio, profile pictures, and social links
- **Categories** - Content organization with descriptions and color coding

All content is fetched server-side for optimal SEO and performance.

## Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

For production deployment, make sure to set your Cosmic environment variables in your hosting platform's dashboard.
