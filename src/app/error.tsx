'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">出错了</h1>
        <p className="text-xl mb-8">抱歉，页面加载时出现了一些问题</p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
} 