import Link from 'next/link'
import Tag from '@/components/Tag'
import { posts } from '@/data/posts'

export default function TagPage({ params }: { params: { tag: string } }) {
  const tagPosts = posts.filter(post => post.tags.includes(params.tag))

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">
          Posts tagged with <Tag tag={params.tag} />
        </h1>
        <p className="text-gray-600">
          {tagPosts.length} {tagPosts.length === 1 ? 'post' : 'posts'} found
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {tagPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              {/* Placeholder for featured image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
            </div>
            <div className="p-8">
              <div className="text-sm text-accent mb-2">{post.date}</div>
              <h2 className="text-2xl font-display font-bold mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Tag key={tag} tag={tag} href={`/tags/${tag}`} />
                ))}
              </div>
              <Link 
                href={`/posts/${post.id}`} 
                className="inline-flex items-center text-accent hover:text-primary transition-colors"
              >
                Read more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
} 