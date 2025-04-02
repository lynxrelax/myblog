export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">页面未找到</p>
        <a href="/" className="text-blue-500 hover:text-blue-600">
          返回首页
        </a>
      </div>
    </div>
  );
} 