import { useState } from 'react';

interface App {
  id: string;
  name: string;
  category: string;
  rating: string;
  image: string;
}

export const AppStoreDemo = () => {
  const [activeTab, setActiveTab] = useState('today');

  const apps: App[] = [
    { id: '1', name: '微信', category: '社交', rating: '4.9', image: '💬' },
    { id: '2', name: '抖音', category: '视频', rating: '4.8', image: '🎵' },
    { id: '3', name: '支付宝', category: '生活', rating: '4.7', image: '💳' },
    { id: '4', name: '淘宝', category: '购物', rating: '4.6', image: '🛒' },
    { id: '5', name: '京东', category: '购物', rating: '4.5', image: '📦' },
    { id: '6', name: '美团', category: '生活', rating: '4.4', image: '🍔' },
    { id: '7', name: '滴滴出行', category: '出行', rating: '4.3', image: '🚗' },
    { id: '8', name: '高德地图', category: '导航', rating: '4.2', image: '🗺️' },
    { id: '9', name: '百度网盘', category: '工具', rating: '4.1', image: '💾' },
  ];

  const tabs = [
    { id: 'today', label: '今日' },
    { id: 'games', label: '游戏' },
    { id: 'apps', label: 'App' },
    { id: 'update', label: '更新' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f5f5f7]">
      {/* Top Bar */}
      <div className="h-12 bg-white flex items-center justify-center border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Featured Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">精选推荐</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Large Featured Card */}
            <div className="col-span-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold mb-2">Apple Arcade</h3>
              <p className="text-white/80">超过 100 款精选游戏，无广告、无内购</p>
            </div>
            {/* Small Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="text-5xl mb-3">🎵</div>
              <h3 className="font-bold text-gray-800 mb-1">Apple Music</h3>
              <p className="text-sm text-gray-500">海量无损音乐，随身聆听</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-xs text-gray-400 ml-2">4.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Apps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">热门 App</h2>
          <div className="grid grid-cols-6 gap-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl mb-2 shadow-sm">
                  {app.image}
                </div>
                <span className="text-sm text-gray-800 text-center mb-1">{app.name}</span>
                <span className="text-[10px] text-gray-500">{app.category}</span>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500 text-[10px]">★★★★</span>
                  <span className="text-[10px] text-gray-400 ml-1">{app.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apps List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">你应该知道的应用</h2>
          <div className="space-y-3">
            {[
              { name: '微信', dev: 'Tencent Technology', size: '312 MB', image: '💬' },
              { name: '抖音', dev: 'ByteDance', size: '256 MB', image: '🎵' },
              { name: '支付宝', dev: 'Alibaba', size: '198 MB', image: '💳' },
            ].map((app, i) => (
              <div
                key={i}
                className="flex items-center bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mr-4">
                  {app.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{app.name}</h3>
                  <p className="text-xs text-gray-500">{app.dev}</p>
                  <p className="text-xs text-gray-400">{app.size}</p>
                </div>
                <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors">
                  获取
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
