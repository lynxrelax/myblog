'use client';

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 解析 Markdown 内容中的标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    const parsedHeadings = matches.map(match => ({
      id: match[2].toLowerCase().replace(/\s+/g, '-'),
      text: match[2],
      level: match[1].length
    }));
    setHeadings(parsedHeadings);

    // 监听滚动事件来更新当前阅读位置和进度
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // 观察所有标题元素
    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-4 top-20 w-64 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">目录</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {headings.map((heading) => (
            <div
              key={heading.id}
              className={`cursor-pointer transition-all duration-200 relative ${
                activeId === heading.id 
                  ? 'text-blue-500 font-medium' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 1.5}rem` }}
              onClick={() => scrollToHeading(heading.id)}
            >
              {activeId === heading.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
              )}
              {heading.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 