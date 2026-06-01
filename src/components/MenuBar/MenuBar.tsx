import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Bell, Battery, Wifi } from 'lucide-react';

interface MenuItem {
  label: string;
  action?: () => void;
  shortcut?: string;
  type?: 'separator';
}

const menus: { label: string; items: MenuItem[] }[] = [
  {
    label: 'Apple',
    items: [
      { label: '关于此 Mac', action: () => {} },
      { label: '系统设置...', action: () => useStore.getState().launchApp('settings') },
      { type: 'separator' } as MenuItem,
      { label: '睡眠', action: () => {} },
      { label: '重新启动...', action: () => {} },
      { label: '关机...', action: () => {} },
    ],
  },
  {
    label: '文件',
    items: [
      { label: '新建 Finder 窗口', action: () => useStore.getState().launchApp('finder') },
      { label: '新建文件夹', action: () => {} },
      { type: 'separator' } as MenuItem,
      { label: '关闭窗口', action: () => {}, shortcut: '⌘W' },
    ],
  },
  {
    label: '编辑',
    items: [
      { label: '撤销', action: () => {}, shortcut: '⌘Z' },
      { label: '重做', action: () => {}, shortcut: '⇧⌘Z' },
      { type: 'separator' } as MenuItem,
      { label: '剪切', action: () => {}, shortcut: '⌘X' },
      { label: '复制', action: () => {}, shortcut: '⌘C' },
      { label: '粘贴', action: () => {}, shortcut: '⌘V' },
      { label: '全选', action: () => {}, shortcut: '⌘A' },
    ],
  },
  {
    label: '显示',
    items: [
      { label: '按图标查看', action: () => {} },
      { label: '按列表查看', action: () => {} },
      { label: '按列查看', action: () => {} },
      { type: 'separator' } as MenuItem,
      { label: '显示路径栏', action: () => {} },
      { label: '显示状态栏', action: () => {} },
      { type: 'separator' } as MenuItem,
      { label: '清理', action: () => {} },
    ],
  },
  {
    label: '窗口',
    items: [
      { label: '最小化', action: () => {}, shortcut: '⌘M' },
      { label: '缩放', action: () => {} },
      { type: 'separator' } as MenuItem,
      { label: '全部并排显示', action: () => {} },
      { label: '聚焦到窗口', action: () => {}, shortcut: '⌘⌥W' },
    ],
  },
  {
    label: '帮助',
    items: [
      { label: 'macOS 帮助', action: () => {} },
      { label: 'Finder 帮助', action: () => {} },
    ],
  },
];

const menuBarApps = [
  { id: 'finder', name: '访达', color: '#5AC8FA' },
  { id: 'safari', name: 'Safari', color: '#007AFF' },
  { id: 'mail', name: '邮件', color: '#007AFF' },
  { id: 'notes', name: '备忘录', color: '#FFCC00' },
];

export const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { openControlPanel, openLaunchPad, activeMenuBarApp, setActiveMenuBarApp } = useStore();

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
  };

  const handleAppClick = (appId: string) => {
    setActiveMenuBarApp(appId);
    if (appId === 'finder') {
      useStore.getState().launchApp('finder');
    }
  };

  const currentTime = new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });

  return (
    <div
      className="h-7 bg-white/15 backdrop-blur-xl flex items-center px-2 text-[13px] text-gray-800 border-b border-black/5 fixed top-0 left-0 right-0 z-[9999]"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        boxShadow: 'inset 0 -0.5px 0 0 rgba(0,0,0,0.1)',
      }}
      onClick={() => setActiveMenu(null)}
    >
      {/* Apple Logo */}
      <button
        className="mx-1 hover:bg-black/5 px-2 py-0.5 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          handleMenuClick('Apple');
        }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-800" style={{ fill: '#1d1d1f' }}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </button>

      {/* App Icons in Menu Bar */}
      <div className="flex items-center gap-0.5">
        {menuBarApps.map((app) => (
          <button
            key={app.id}
            className={`px-2.5 py-0.5 rounded-md text-[13px] font-semibold transition-colors ${
              activeMenuBarApp === app.id
                ? 'bg-black/10'
                : 'hover:bg-black/5'
            }`}
            style={{
              color: '#1d1d1f',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAppClick(app.id);
            }}
          >
            {app.name}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side */}
      <div className="flex items-center gap-3 text-[13px]" style={{ color: '#1d1d1f' }}>
        {/* Siri */}
        <button className="hover:bg-black/5 p-1 rounded-md">
          <svg viewBox="0 0 100 100" className="w-4 h-4">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#1d1d1f" strokeWidth="4" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#1d1d1f" strokeWidth="3" />
            <circle cx="50" cy="50" r="8" fill="#1d1d1f" />
          </svg>
        </button>

        {/* Control Center */}
        <button
          className="hover:bg-black/5 p-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            openControlPanel('controlCenter');
          }}
        >
          <svg viewBox="0 0 100 100" className="w-4 h-4">
            <rect x="15" y="20" width="70" height="25" rx="5" fill="none" stroke="#1d1d1f" strokeWidth="5" />
            <rect x="15" y="55" width="35" height="25" rx="5" fill="#1d1d1f" />
            <rect x="55" y="55" width="30" height="25" rx="5" fill="#1d1d1f" />
          </svg>
        </button>

        {/* Notification Center */}
        <button
          className="hover:bg-black/5 p-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            openControlPanel('notificationCenter');
          }}
        >
          <Bell size={16} className="text-gray-800" />
        </button>

        {/* LaunchPad */}
        <button
          className="hover:bg-black/5 p-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            openLaunchPad();
          }}
        >
          <svg viewBox="0 0 100 100" className="w-4 h-4">
            <rect x="15" y="15" width="70" height="70" rx="12" fill="none" stroke="#1d1d1f" strokeWidth="6" />
            <rect x="30" y="30" width="15" height="15" rx="3" fill="#1d1d1f" />
            <rect x="55" y="30" width="15" height="15" rx="3" fill="#1d1d1f" />
            <rect x="30" y="55" width="15" height="15" rx="3" fill="#1d1d1f" />
            <rect x="55" y="55" width="15" height="15" rx="3" fill="#1d1d1f" />
          </svg>
        </button>

        {/* Battery */}
        <div className="flex items-center gap-1">
          <Battery size={16} className="text-gray-800" />
          <span className="text-[11px] font-medium">100%</span>
        </div>

        {/* WiFi */}
        <Wifi size={16} className="text-gray-800" />

        {/* Time */}
        <span className="text-[11px] font-medium">{currentTime}</span>
      </div>

      {/* Dropdown Menus */}
      {activeMenu && (
        <div
          className="absolute top-6 left-0 bg-white/80 backdrop-blur-xl border border-black/10 rounded-lg py-1 shadow-xl min-w-56 text-[13px] text-gray-800"
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.05)',
          }}
        >
          {(activeMenu === 'Apple' ? menus[0] : menus.find((m) => m.label === activeMenu))?.items.map((item: MenuItem, index: number) =>
            item.type === 'separator' ? (
              <div key={index} className="h-px bg-black/10 mx-2 my-1" />
            ) : (
              <button
                key={index}
                className="w-full px-3 py-1 text-left hover:bg-blue-500 hover:text-white flex justify-between items-center rounded-md mx-1"
                style={{ width: 'calc(100% - 8px)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-gray-400 text-[11px] ml-4">{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
