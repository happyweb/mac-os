import { useState } from 'react';

interface BrowserProps {
  defaultUrl?: string;
}

export const Browser = ({ defaultUrl = '' }: BrowserProps) => {
  const [inputUrl, setInputUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    // Add to history
    const newHistory = [...history.slice(0, historyIndex + 1), finalUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Try to load in iframe (will work for sites that allow it)
    const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = finalUrl;
    }
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setInputUrl(history[historyIndex - 1]);
      const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = history[historyIndex - 1];
      }
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setInputUrl(history[historyIndex + 1]);
      const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = history[historyIndex + 1];
      }
    }
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
    if (iframe && inputUrl) {
      iframe.src = inputUrl;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* URL Bar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b border-gray-200">
        <button
          onClick={handleGoBack}
          className="p-1.5 hover:bg-gray-200 rounded"
          disabled={historyIndex <= 0}
        >
          <svg className={`w-4 h-4 ${historyIndex <= 0 ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleGoForward}
          className="p-1.5 hover:bg-gray-200 rounded"
          disabled={historyIndex >= history.length - 1}
        >
          <svg className={`w-4 h-4 ${historyIndex >= history.length - 1 ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={handleRefresh}
          className="p-1.5 hover:bg-gray-200 rounded"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            placeholder="搜索或输入网址"
          />
        </form>
      </div>
      {/* Browser Content - Demo Homepage */}
      <div className="flex-1 bg-white overflow-auto">
        <div className="max-w-3xl mx-auto p-8">
          {/* Search Bar */}
          <div className="flex flex-col items-center mt-20">
            <h1 className="text-5xl font-bold text-blue-500 mb-8">Browser</h1>
            <div className="w-full max-w-xl">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full px-6 py-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                placeholder="输入网址后按回车访问"
              />
            </div>
            <p className="mt-6 text-gray-500 text-sm">
              输入网址访问网页，或直接在地址栏输入搜索内容
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-16 grid grid-cols-4 gap-6">
            {[
              { name: 'Google', url: 'https://www.google.com', color: 'bg-blue-500' },
              { name: 'GitHub', url: 'https://github.com', color: 'bg-gray-800' },
              { name: 'YouTube', url: 'https://www.youtube.com', color: 'bg-red-500' },
              { name: 'Wikipedia', url: 'https://www.wikipedia.org', color: 'bg-gray-600' },
            ].map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setInputUrl(link.url);
                  const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
                  if (iframe) {
                    iframe.src = link.url;
                  }
                }}
                className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center text-white font-bold mb-2`}>
                  {link.name[0]}
                </div>
                <span className="text-sm text-gray-600">{link.name}</span>
              </button>
            ))}
          </div>

          {/* Hidden iframe for actual browsing */}
          <iframe
            id="browser-iframe"
            className="hidden"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
            title="Browser"
          />
        </div>
      </div>
    </div>
  );
};
