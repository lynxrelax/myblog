import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-soft">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-display font-bold text-primary hover:text-accent transition-colors">
            Lynxrelax
          </Link>
          <div className="space-x-8">
            <Link href="/" className="text-gray-600 hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 