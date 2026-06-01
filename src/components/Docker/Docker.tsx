import { useState } from 'react';

interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  ports: string;
}

const mockContainers: Container[] = [
  { id: 'abc123', name: 'nginx-web', image: 'nginx:latest', status: 'running', ports: '80:80' },
  { id: 'def456', name: 'postgres-db', image: 'postgres:14', status: 'running', ports: '5432:5432' },
  { id: 'ghi789', name: 'redis-cache', image: 'redis:alpine', status: 'paused', ports: '6379:6379' },
  { id: 'jkl012', name: 'api-server', image: 'node:18', status: 'stopped', ports: '3000:3000' },
];

export const DockerDemo = () => {
  const [containers, setContainers] = useState(mockContainers);
  const [activeTab, setActiveTab] = useState<'containers' | 'images' | 'volumes'>('containers');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'stopped': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'paused': return '已暂停';
      case 'stopped': return '已停止';
      default: return status;
    }
  };

  const toggleContainer = (id: string) => {
    setContainers(containers.map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        status: c.status === 'running' ? 'stopped' : 'running',
      };
    }));
  };

  const tabs = [
    { id: 'containers', name: '容器', icon: '📦' },
    { id: 'images', name: '镜像', icon: '🖼️' },
    { id: 'volumes', name: '存储卷', icon: '💾' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">
            D
          </div>
          <span className="font-semibold">Docker Desktop</span>
        </div>
        <div className="text-sm text-gray-400">
          Docker version 24.0.0
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-700 text-gray-300 px-4 flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-400 text-white'
                : 'border-transparent hover:text-white'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'containers' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <span className="font-medium text-gray-700">容器列表</span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                + 新建容器
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs text-gray-500">
                  <th className="p-3 font-medium">状态</th>
                  <th className="p-3 font-medium">名称</th>
                  <th className="p-3 font-medium">镜像</th>
                  <th className="p-3 font-medium">端口</th>
                  <th className="p-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container) => (
                  <tr key={container.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                        <span className="text-sm">{getStatusText(container.status)}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-800">{container.name}</td>
                    <td className="p-3 text-sm text-gray-600">{container.image}</td>
                    <td className="p-3 text-sm text-gray-500">{container.ports}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleContainer(container.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          container.status === 'running'
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                      >
                        {container.status === 'running' ? '停止' : '启动'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="bg-white rounded-lg shadow p-4 text-gray-500 text-center">
            镜像列表为空
          </div>
        )}

        {activeTab === 'volumes' && (
          <div className="bg-white rounded-lg shadow p-4 text-gray-500 text-center">
            存储卷列表为空
          </div>
        )}
      </div>
    </div>
  );
};
