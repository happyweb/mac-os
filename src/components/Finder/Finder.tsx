import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  date?: string;
}

export const FinderDemo = () => {
  const [currentPath, setCurrentPath] = useState('/Users/user');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const files: FileItem[] = [
    { id: '1', name: 'Desktop', type: 'folder' },
    { id: '2', name: 'Documents', type: 'folder' },
    { id: '3', name: 'Downloads', type: 'folder' },
    { id: '4', name: 'Pictures', type: 'folder' },
    { id: '5', name: 'Music', type: 'folder' },
    { id: '6', name: 'Movies', type: 'folder' },
    { id: '7', name: 'notes.txt', type: 'file', size: '2.5 KB', date: '2024/1/15' },
    { id: '8', name: 'report.pdf', type: 'file', size: '156 KB', date: '2024/1/14' },
    { id: '9', name: 'photo.jpg', type: 'file', size: '2.3 MB', date: '2024/1/13' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="h-10 bg-[#f5f5f5] flex items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">{currentPath}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-[#f5f5f5] border-r border-gray-200 overflow-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">个人收藏</div>
            {[
              { name: '桌面', icon: '🖥️' },
              { name: '文档', icon: '📄' },
              { name: '下载', icon: '⬇️' },
              { name: '图片', icon: '🖼️' },
              { name: '音乐', icon: '🎵' },
              { name: '影片', icon: '🎬' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-200 rounded cursor-pointer text-sm">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-200">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">iCloud</div>
            {[
              { name: 'iCloud 云盘', icon: '☁️' },
              { name: '文稿', icon: '📁' },
              { name: '桌面', icon: '🖥️' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-200 rounded cursor-pointer text-sm">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-6 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedId(file.id)}
                className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${
                  selectedId === file.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'
                }`}
              >
                <img
                  src="/images/Documents.png"
                  alt={file.name}
                  className="w-14 h-14 mb-1 object-contain"
                />
                <span className="text-xs text-center text-gray-700 truncate w-full">{file.name}</span>
                {file.size && <span className="text-[10px] text-gray-400">{file.size}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#f5f5f5] border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
        <span>{files.length} 个项目</span>
        <span>26.5 GB 可用</span>
      </div>
    </div>
  );
};
