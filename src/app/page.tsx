import Link from 'next/link'
import Tag from '@/components/Tag'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Ad Astra Abyssosque
        </h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {post.image && (
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  <Link href={`/posts/${post.id}`} className="hover:text-indigo-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <div className="text-gray-500 mb-4">{post.date}</div>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tag={tag} href={`/tags/${tag}`} />
                  ))}
                </div>
                <Link
                  href={`/posts/${post.id}`}
                  className="inline-block text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
} 