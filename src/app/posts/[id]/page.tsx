import Link from 'next/link'
import Tag from '@/components/Tag'
import { getPostById } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Markdown from '@/components/Markdown'

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {post.image && (
            <div className="relative h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="text-gray-500 mb-6">{post.date}</div>
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} tag={tag} href={`/tags/${tag}`} />
                ))}
              </div>
            </header>
            <div className="prose prose-lg max-w-none">
              <Markdown content={post.content} />
            </div>
          </div>
        </div>
      </article>
    </main>
  )
} 