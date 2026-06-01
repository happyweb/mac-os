import { useState } from 'react';

export const WordDemo = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3]">
      {/* Menu Bar */}
      <div className="h-9 bg-white flex items-center px-4 border-b border-gray-200 text-sm">
        <span className="font-semibold mr-4">文件</span>
        <span className="mr-4">编辑</span>
        <span className="mr-4">视图</span>
        <span className="mr-4">插入</span>
        <span className="mr-4">格式</span>
        <span className="mr-4">工具</span>
        <span className="mr-4">表格</span>
        <span className="mr-4">窗口</span>
        <span>帮助</span>
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-white flex items-center px-4 gap-2 border-b border-gray-200 text-sm">
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 hover:bg-gray-100 rounded">📋</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">✂️</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">📝</button>
        </div>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 hover:bg-gray-100 rounded font-bold">B</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded italic font-serif">I</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded underline">U</button>
        </div>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 hover:bg-gray-100 rounded">📤</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">📥</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">🔗</button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 flex justify-center pt-8 overflow-auto">
        <div className="w-[816px] min-h-[1056px] bg-white shadow-lg flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-end justify-center pb-2 border-b border-gray-300">
            <span className="text-gray-400 text-sm">Microsoft Word - 文档1</span>
          </div>

          {/* Content */}
          <div
            className="flex-1 p-16 outline-none focus:ring-2 focus:ring-[#0078d4]/30 focus:ring-inset"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
          >
            {/* Title */}
            <h1 className="text-center text-3xl font-bold mb-8">Sample Document</h1>

            {/* Paragraph */}
            <p className="text-base leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <p className="text-base leading-relaxed mb-4">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="text-base leading-relaxed mb-8">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* List */}
            <h2 className="text-xl font-bold mb-4">Features:</h2>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li>Professional document editing</li>
              <li>Rich text formatting options</li>
              <li>Easy to use interface</li>
              <li>Cloud sync support</li>
            </ul>

            {/* Table */}
            <h2 className="text-xl font-bold mb-4 mt-8">Sample Table:</h2>
            <table className="w-full border-collapse border border-gray-300 mb-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Header 1</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Header 2</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Header 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cell 1</td>
                  <td className="border border-gray-300 px-4 py-2">Cell 2</td>
                  <td className="border border-gray-300 px-4 py-2">Cell 3</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cell 4</td>
                  <td className="border border-gray-300 px-4 py-2">Cell 5</td>
                  <td className="border border-gray-300 px-4 py-2">Cell 6</td>
                </tr>
              </tbody>
            </table>

            {/* More content */}
            <p className="text-base leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Footer */}
          <div className="h-8 flex items-center justify-between px-16 border-t border-gray-300 text-xs text-gray-500">
            <span>第 1 页，共 1 页</span>
            <span>字数: 156</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#0078d4] flex items-center justify-between px-4 text-white text-xs">
        <div className="flex gap-4">
          <span>📝 {isEditing ? '正在编辑' : '就绪'}</span>
        </div>
        <div className="flex gap-4">
          <span>100%</span>
          <span>中文(简体)</span>
        </div>
      </div>
    </div>
  );
};
