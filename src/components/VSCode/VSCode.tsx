import { useState } from 'react';

export const VSCodeDemo = () => {
  const [activeTab, setActiveTab] = useState('index.tsx');
  const [sidebarItem, setSidebarItem] = useState('explorer');

  const files = [
    { name: 'index.tsx', content: 'const App = () => {\n  return <div>Hello World</div>;\n};' },
    { name: 'App.tsx', content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Welcome to React</h1>\n    </div>\n  );\n}\n\nexport default App;' },
    { name: 'styles.css', content: '.App {\n  text-align: center;\n  padding: 20px;\n}\n\nh1 {\n  color: #61dafb;\n}' },
  ];

  const currentFile = files.find(f => f.name === activeTab) || files[0];

  const sidebarItems = [
    { id: 'explorer', icon: '📁' },
    { id: 'search', icon: '🔍' },
    { id: 'git', icon: '⎇' },
    { id: 'debug', icon: '🐛' },
    { id: 'extensions', icon: '📦' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white text-sm font-mono">
      {/* Top Bar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-[#404040]">
        <div className="flex gap-4">
          <span className="text-[#cccccc]">文件</span>
          <span className="text-[#cccccc]">编辑</span>
          <span className="text-[#cccccc]">视图</span>
          <span className="text-[#cccccc]">转到</span>
          <span className="text-[#cccccc]">运行</span>
          <span className="text-[#cccccc]">终端</span>
          <span className="text-[#cccccc]">帮助</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-14 bg-[#252526] flex flex-col items-center py-2 gap-2 border-r border-[#404040]">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSidebarItem(item.id)}
              className={`w-10 h-10 flex items-center justify-center rounded ${
                sidebarItem === item.id ? 'bg-[#094771]' : 'hover:bg-[#2a2d2e]'
              }`}
              title={item.id}
            >
              <span className="text-base">{item.icon}</span>
            </button>
          ))}
        </div>

        {/* Explorer Panel */}
        <div className="w-52 bg-[#252526] border-r border-[#404040] flex flex-col">
          <div className="h-8 flex items-center px-3 text-xs text-[#cccccc] border-b border-[#404040]">
            EXPLORER
          </div>
          <div className="flex-1 overflow-auto p-2">
            <div className="text-[#cccccc] text-xs mb-2">MY PROJECT</div>
            {files.map(file => (
              <div
                key={file.name}
                className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-xs ${
                  activeTab === file.name ? 'bg-[#094771]' : 'hover:bg-[#2a2d2e]'
                }`}
                onClick={() => setActiveTab(file.name)}
              >
                <span className="text-[#519aba]">📄</span>
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="h-9 bg-[#2d2d2d] flex items-end">
            {files.map(file => (
              <button
                key={file.name}
                onClick={() => setActiveTab(file.name)}
                className={`px-4 py-2 text-xs flex items-center gap-2 border-r border-[#404040] ${
                  activeTab === file.name
                    ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                    : 'bg-[#2d2d2d] text-[#969696] border-t-2 border-t-transparent'
                }`}
              >
                <span className="text-[#519aba]">📄</span>
                {file.name}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
            <pre className="text-[#d4d4d4] text-sm leading-6">
              {currentFile.content.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-12 text-[#858585] select-none text-right pr-4">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </pre>
          </div>

          {/* Terminal Panel */}
          <div className="h-32 bg-[#1e1e1e] border-t border-[#404040] flex flex-col">
            <div className="h-7 bg-[#2d2d2d] flex items-center px-4 gap-4 border-t border-[#404040]">
              <span className="text-white text-xs">终端</span>
              <span className="text-[#969696] text-xs">问题</span>
              <span className="text-[#969696] text-xs">输出</span>
              <span className="text-[#969696] text-xs">调试控制台</span>
            </div>
            <div className="flex-1 p-2 font-mono text-xs text-[#d4d4d4]">
              <div>$ npm start</div>
              <div className="text-[#4ec9b0]">&gt; react-app@0.1.0 start</div>
              <div className="text-[#4ec9b0]">&gt; vite</div>
              <div className="text-[#ce9178]">VITE v5.0.0 ready in 1234 ms</div>
              <div className="text-[#4ec9b0]">➜ Local: http://localhost:5173/</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-xs">
        <div className="flex gap-4">
          <span>⎇ main</span>
          <span>🔔 0</span>
          <span>✏️ 0</span>
        </div>
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>TypeScript React</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  );
};
