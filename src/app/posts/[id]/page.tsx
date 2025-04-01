import Link from 'next/link'
import Tag from '@/components/Tag'
import { posts } from '@/data/posts'

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === params.id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center text-accent hover:text-primary mb-12 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to home
      </Link>
      
      <div className="aspect-video relative bg-gray-100 rounded-xl mb-12 overflow-hidden">
        {/* Placeholder for featured image */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
      </div>
      
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
        <div className="text-accent mb-6">{post.date}</div>
        <div className="flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} href={`/tags/${tag}`} />
          ))}
        </div>
      </header>
      
      <div className="prose prose-lg mx-auto">
        <p>
          {post.content}
        </p>
        
        <h2 className="text-2xl font-display font-bold mt-12 mb-6">Subheading</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <h2 className="text-2xl font-display font-bold mt-12 mb-6">Another Section</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
    </article>
  )
} 