import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                热爱生活，热爱艺术，热爱分享。这里是我记录生活点滴、分享艺术见解的小天地。
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">个人简介</h2>
                <p className="text-gray-700 mb-4">
                  你好！我是一名热爱艺术和设计的创作者。通过这个博客，我希望能够分享我对艺术、设计和生活的独特见解。
                </p>
                <p className="text-gray-700">
                  在这里，我会分享关于艺术展览、设计趋势、生活美学等内容，希望能够与志同道合的朋友们交流和学习。
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">联系方式</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">邮箱：</span>
                    <a href="mailto:your.email@example.com" className="text-indigo-600 hover:text-indigo-700">
                      your.email@example.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">社交媒体：</span>
                    <div className="flex gap-4 mt-2">
                      <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Twitter
                      </a>
                      <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Instagram
                      </a>
                      <a href="#" className="text-gray-600 hover:text-indigo-600">
                        LinkedIn
                      </a>
                    </div>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">技能专长</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['艺术鉴赏', '设计创作', '摄影', '写作', '策展', '艺术教育'].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 