import { useState } from 'react';

interface Request {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  params: Record<string, string>;
}

const mockRequests: Request[] = [
  { id: '1', method: 'GET', url: '/api/users', params: {} },
  { id: '2', method: 'POST', url: '/api/users', params: {} },
  { id: '3', method: 'GET', url: '/api/posts', params: {} },
];

export const PostmanDemo = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [url, setUrl] = useState('https://api.example.com/users');
  const [response, setResponse] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('params');

  const sendRequest = () => {
    setResponse(JSON.stringify({
      status: 200,
      time: '245ms',
      size: '1.2KB',
      data: [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' },
      ]
    }, null, 2));
  };

  const getMethodColor = (m: string) => {
    switch (m) {
      case 'GET': return 'bg-green-500';
      case 'POST': return 'bg-blue-500';
      case 'PUT': return 'bg-yellow-500';
      case 'DELETE': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <div className="text-sm font-semibold mb-2">Collections</div>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <div className="text-xs text-gray-400 mb-2">My Workspace</div>
          {mockRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer text-sm"
            >
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${getMethodColor(req.method)}`}>
                {req.method}
              </span>
              <span className="truncate">{req.url}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Request Bar */}
        <div className="bg-gray-200 border-b border-gray-300 p-3 flex items-center gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as typeof method)}
            className={`px-3 py-1.5 rounded text-white text-sm ${getMethodColor(method)}`}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
            placeholder="Enter URL"
          />
          <button
            onClick={sendRequest}
            className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
          >
            Send
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 border-b border-gray-300 px-4 flex gap-4">
          {(['params', 'headers', 'body'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          {activeTab === 'params' && (
            <div className="text-sm text-gray-600">Query Parameters</div>
          )}
          {activeTab === 'headers' && (
            <div className="text-sm text-gray-600">Headers</div>
          )}
          {activeTab === 'body' && (
            <textarea
              className="w-full h-32 border border-gray-300 rounded p-2 text-sm font-mono"
              placeholder="Raw JSON"
            />
          )}
        </div>

        {/* Response */}
        {response && (
          <div className="border-t border-gray-300 p-4 bg-white">
            <div className="text-sm font-semibold mb-2">Response</div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-auto max-h-48">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
