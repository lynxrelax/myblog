import Link from 'next/link'

interface TagProps {
  tag: string
  href?: string
}

export default function Tag({ tag, href }: TagProps) {
  const tagContent = (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
      #{tag}
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {tagContent}
      </Link>
    )
  }

  return tagContent
} 