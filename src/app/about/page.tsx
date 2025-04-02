import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">关于我</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          欢迎来到我的博客！这里是我分享技术、生活和思考的地方。
        </p>
        <p>
          我热爱编程、设计和写作，希望通过这个平台与大家分享我的经验和见解。
        </p>
        <p>
          如果你有任何问题或建议，欢迎通过联系方式与我交流。
        </p>
      </div>
    </div>
  );
} 