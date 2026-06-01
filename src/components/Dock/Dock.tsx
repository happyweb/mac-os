import React from 'react';
import { useStore } from '../../store/useStore';
import { MacOSIcon } from '../MacOSIcon';

const dockItems = [
  { id: 'finder', name: '访达', icon: '1' },
  { id: 'launchpad', name: 'App Store', icon: '2' },
  { id: 'safari', name: 'Safari', icon: '3' },
  { id: 'mail', name: 'Google Chrome', icon: '4' },
  { id: 'notes', name: 'Xcode', icon: '5' },
  { id: 'reminders', name: 'Visual Studio Code', icon: '6' },
  { id: 'calendar', name: 'Web Storm', icon: '7' },
  { id: 'photos', name: 'Microsoft Word', icon: '8' },
  { id: 'settings', name: 'Facebook', icon: '9' },
];

export const Dock = () => {
  const { dockApps, launchApp } = useStore();

  // 分隔线后的应用 (第5个之后加分隔线)
  const separatorIndex = 5;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      {/* Dock 容器 */}
      <div
        className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3 flex items-end gap-4"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1), inset 0 0 0 0.5px rgba(255,255,255,0.1)',
        }}
      >
        {dockItems.map((app, index) => (
          <React.Fragment key={app.id}>
            {/* 分隔线 */}
            {index === separatorIndex && (
              <div
                className="w-px h-12 bg-white/40 rounded-full mx-0.5 mb-1"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              />
            )}

            <button
              className="relative group flex flex-col items-center"
              onClick={() => launchApp(app.id)}
            >
              {/* 图标 */}
              <div
                className="transition-all duration-200 group-hover:scale-125 group-hover:-translate-y-2"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
                }}
              >
                <MacOSIcon
                  name={app.icon}
                  size={58}
                  useImage={true}
                />
              </div>

              {/* 运行中指示器 */}
              {dockApps.find(d => d.id === app.id)?.isRunning && (
                <div
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: dockApps.find(d => d.id === app.id)?.iconColor || '#5AC8FA' }}
                />
              )}

              {/* 悬停提示 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-150">
                <div
                  className="bg-gray-900/90 backdrop-blur-xl text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg border border-white/10"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  {app.name}
                </div>
                {/* 小三角 */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900/90" />
              </div>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
