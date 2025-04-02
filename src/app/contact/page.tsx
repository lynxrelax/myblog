export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">联系我</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          如果你有任何问题、建议或合作意向，欢迎通过以下方式与我联系：
        </p>
        <ul>
          <li>邮箱：your.email@example.com</li>
          <li>GitHub：your-github-username</li>
          <li>其他社交媒体：待添加</li>
        </ul>
      </div>
    </div>
  );
} 