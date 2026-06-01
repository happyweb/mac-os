# macOS Sonoma 桌面模拟器 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans

**Goal:** 构建完整的 macOS Sonoma 桌面模拟器，包含桌面、程序坞、菜单栏、控制中心、通知中心、窗口管理系统

**Architecture:** React 18 + TypeScript + Tailwind CSS + Zustand 单页应用

---

## 文件结构

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types/
│   └── index.ts
├── store/
│   └── useStore.ts
├── components/
│   ├── MenuBar/
│   │   ├── MenuBar.tsx
│   │   └── MenuItems.tsx
│   ├── Desktop/
│   │   ├── Desktop.tsx
│   │   └── DesktopIcon.tsx
│   ├── Dock/
│   │   └── Dock.tsx
│   ├── Window/
│   │   ├── Window.tsx
│   │   └── WindowManager.tsx
│   ├── ControlCenter/
│   │   └── ControlCenter.tsx
│   └── NotificationCenter/
│       └── NotificationCenter.tsx
└── apps/
    └── (预留应用目录)
```

---

## Task 1: 项目初始化

**Files:**
- Use existing package.json, vite.config.ts, tailwind.config.js, tsconfig.json
- Update index.css for macOS styling

- [ ] **Step 1: 更新 src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  user-select: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
```

- [ ] **Step 2: 更新 App.tsx 基础结构**

```tsx
function App() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />

      {/* System UI */}
      <MenuBar />
      <Desktop />
      <Dock />
      <ControlCenter />
      <NotificationCenter />

      {/* Window Layer */}
      <WindowManager />
    </div>
  );
}
```

---

## Task 2: 类型定义

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: 创建类型定义**

```typescript
export interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface DockApp {
  id: string;
  name: string;
  icon: string;
  isRunning: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

export type ControlPanelType = 'none' | 'controlCenter' | 'notificationCenter';
```

---

## Task 3: Zustand Store

**Files:**
- Create: `src/store/useStore.ts`

- [ ] **Step 1: 创建 Store**

```typescript
import { create } from 'zustand';
import { WindowState, DockApp, ControlPanelType } from '../types';

interface AppState {
  // 窗口管理
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;

  // Control Center
  controlPanel: ControlPanelType;

  // Dock
  dockApps: DockApp[];

  // 壁纸
  wallpaper: string;

  // Actions - 窗口
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  focusWindow: (id: string) => void;

  // Actions - Control Center
  openControlPanel: (panel: ControlPanelType) => void;
  closeControlPanel: () => void;

  // Actions - Dock
  launchApp: (appId: string) => void;
  hideApp: (appId: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
  controlPanel: 'none',
  wallpaper: 'gradient',
  dockApps: [
    { id: 'finder', name: '访达', icon: '📁', isRunning: false },
    { id: 'settings', name: '系统设置', icon: '⚙️', isRunning: false },
    { id: 'terminal', name: '终端', icon: '💻', isRunning: false },
    { id: 'notes', name: '备忘录', icon: '📝', isRunning: false },
    { id: 'safari', name: 'Safari', icon: '🧭', isRunning: false },
    { id: 'trash', name: '废纸篓', icon: '🗑️', isRunning: false },
  ],

  openWindow: (appId, title) => {
    const id = `${appId}-${Date.now()}`;
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id,
          appId,
          title,
          position: { x: 100 + state.windows.length * 30, y: 100 + state.windows.length * 30 },
          size: { width: 800, height: 500 },
          isMinimized: false,
          isMaximized: false,
          zIndex: state.nextZIndex,
        },
      ],
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },

  focusWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  openControlPanel: (panel) => {
    set({ controlPanel: panel });
  },

  closeControlPanel: () => {
    set({ controlPanel: 'none' });
  },

  launchApp: (appId) => {
    const titles: Record<string, string> = {
      finder: '访达',
      settings: '系统设置',
      terminal: '终端',
      notes: '备忘录',
      safari: 'Safari',
    };
    set((state) => ({
      dockApps: state.dockApps.map((app) =>
        app.id === appId ? { ...app, isRunning: true } : app
      ),
    }));
    get().openWindow(appId, titles[appId] || appId);
  },

  hideApp: (appId) => {
    set((state) => ({
      dockApps: state.dockApps.map((app) =>
        app.id === appId ? { ...app, isRunning: false } : app
      ),
    }));
  },
}));
```

---

## Task 4: MenuBar 组件

**Files:**
- Create: `src/components/MenuBar/MenuBar.tsx`

- [ ] **Step 1: 创建 MenuBar**

```tsx
import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    { label: 'Apple', items: [
      { label: '关于此 Mac', action: () => {} },
      { label: '系统设置...', action: () => useStore.getState().launchApp('settings') },
      { type: 'separator' },
      { label: '睡眠', action: () => {} },
      { label: '重新启动...', action: () => {} },
      { label: '关机...', action: () => {} },
    ]},
    { label: '文件', items: [
      { label: '新建Finder窗口', action: () => useStore.getState().launchApp('finder') },
      { label: '新建文件夹', action: () => {} },
      { type: 'separator' },
      { label: '关闭窗口', action: () => {} },
    ]},
    { label: '编辑', items: [
      { label: '撤销', action: () => {}, shortcut: '⌘Z' },
      { label: '重做', action: () => {}, shortcut: '⇧⌘Z' },
      { type: 'separator' },
      { label: '剪切', action: () => {}, shortcut: '⌘X' },
      { label: '复制', action: () => {}, shortcut: '⌘C' },
      { label: '粘贴', action: () => {}, shortcut: '⌘V' },
    ]},
    { label: '显示', items: [
      { label: '按列表查看', action: () => {} },
      { label: '按图标查看', action: () => {} },
      { type: 'separator' },
      { label: '清理', action: () => {} },
    ]},
    { label: '窗口', items: [
      { label: '最小化', action: () => {}, shortcut: '⌘M' },
      { label: '缩放', action: () => {} },
      { type: 'separator' },
      { label: '全部并排显示', action: () => {} },
    ]},
    { label: '帮助', items: [
      { label: 'macOS 帮助', action: () => {} },
      { label: 'Finder 帮助', action: () => {} },
    ]},
  ];

  return (
    <div
      className="h-7 bg-gray-900/80 backdrop-blur-xl flex items-center px-4 text-sm text-white border-b border-black/20 fixed top-0 left-0 right-0 z-[9999]"
      onClick={() => setActiveMenu(null)}
    >
      {/* Apple Logo */}
      <button
        className="font-semibold text-lg mr-6 hover:bg-white/10 px-2 py-0.5 rounded"
        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'Apple' ? null : 'Apple'); }}
      >
        🍎
      </button>

      {/* Menu Items */}
      {menus.slice(1).map((menu) => (
        <button
          key={menu.label}
          className={`px-3 py-0.5 rounded hover:bg-white/10 ${activeMenu === menu.label ? 'bg-gray-700' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === menu.label ? null : menu.label); }}
        >
          {menu.label}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side - Control Center triggers */}
      <div className="flex items-center gap-3 text-xs">
        <button
          className="hover:bg-white/10 px-2 py-0.5 rounded"
          onClick={(e) => { e.stopPropagation(); useStore.getState().openControlPanel('controlCenter'); }}
        >
          控制中心
        </button>
        <button
          className="hover:bg-white/10 px-2 py-0.5 rounded"
          onClick={(e) => { e.stopPropagation(); useStore.getState().openControlPanel('notificationCenter'); }}
        >
          🔔
        </button>
        <span>🔋 100%</span>
        <span>📶 WiFi</span>
        <span>🕐 {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {/* Dropdown Menus */}
      {activeMenu && menus.find(m => m.label === activeMenu || m.label === 'Apple')?.items && (
        <div className="absolute top-7 left-0 bg-gray-800/90 backdrop-blur-xl border border-white/10 rounded-lg py-1 shadow-xl min-w-56 text-sm">
          {(activeMenu === 'Apple' ? menus[0].items : menus.find(m => m.label === activeMenu)?.items)?.map((item: any, index: number) => (
            item.type === 'separator' ? (
              <div key={index} className="h-px bg-gray-600 my-1" />
            ) : (
              <button
                key={index}
                className="w-full px-4 py-1 text-left hover:bg-blue-500 text-white flex justify-between items-center"
                onClick={(e) => { e.stopPropagation(); item.action(); setActiveMenu(null); }}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-gray-400 text-xs">{item.shortcut}</span>}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## Task 5: Dock 组件

**Files:**
- Create: `src/components/Dock/Dock.tsx`

- [ ] **Step 1: 创建 Dock**

```tsx
import React from 'react';
import { useStore } from '../../store/useStore';

export const Dock: React.FC = () => {
  const { dockApps, launchApp } = useStore();

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-2 py-1 flex items-end gap-1">
        {dockApps.map((app) => (
          <button
            key={app.id}
            className="relative group"
            onClick={() => launchApp(app.id)}
          >
            <div className="text-5xl p-1 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-2">
              {app.icon}
            </div>

            {/* Running indicator */}
            {app.isRunning && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full" />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {app.name}
              </div>
            </div>
          </button>
        ))}

        {/* Separator */}
        <div className="w-px h-10 bg-white/20 mx-1" />

        {/* Trash */}
        <div className="text-5xl p-1 opacity-50">
          🗑️
        </div>
      </div>
    </div>
  );
};
```

---

## Task 6: Window 组件

**Files:**
- Create: `src/components/Window/Window.tsx`
- Create: `src/components/Window/WindowManager.tsx`

- [ ] **Step 1: 创建 Window.tsx**

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { WindowState } from '../../types';
import { useStore } from '../../store/useStore';

interface WindowProps {
  window: WindowState;
  children?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window, children }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize, focusWindow } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (window.isMaximized) return;

    setIsDragging(true);
    focusWindow(window.id);
    dragOffset.current = {
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    focusWindow(window.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateWindowPosition(window.id, {
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
      if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        updateWindowSize(window.id, {
          width: e.clientX - rect.left,
          height: e.clientY - rect.top,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, window.id]);

  if (window.isMinimized) return null;

  const size = window.isMaximized
    ? { width: '100%', height: 'calc(100vh - 28px - 80px)' }
    : { width: window.size.width, height: window.size.height };

  const position = window.isMaximized
    ? { left: 0, top: 28 }
    : { left: window.position.x, top: window.position.y + 28 };

  return (
    <div
      ref={windowRef}
      className="absolute bg-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl overflow-hidden"
      style={{
        left: position.left,
        top: position.top,
        width: typeof size.width === 'number' ? `${size.width}px` : size.width,
        height: typeof size.height === 'number' ? `${size.height}px` : size.height,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => focusWindow(window.id)}
    >
      {/* Title Bar */}
      <div
        className="h-8 bg-gray-100/80 flex items-center px-3 cursor-default"
        onMouseDown={handleMouseDown}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={() => closeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          />
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
          />
          <button
            onClick={() => maximizeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
          />
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-sm text-gray-700 font-medium">
          {window.title}
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto bg-white">
        {children || (
          <div className="p-8 text-center text-gray-500">
            {window.title}
          </div>
        )}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z"/>
          </svg>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: 创建 WindowManager.tsx**

```tsx
import React from 'react';
import { useStore } from '../../store/useStore';
import { Window } from './Window';

export const WindowManager: React.FC = () => {
  const { windows } = useStore();

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ top: 28 }}>
      {windows.map((w) => (
        <div key={w.id} className="pointer-events-auto">
          <Window window={w} />
        </div>
      ))}
    </div>
  );
};
```

---

## Task 7: ControlCenter 组件

**Files:**
- Create: `src/components/ControlCenter/ControlCenter.tsx`

- [ ] **Step 1: 创建 ControlCenter**

```tsx
import React from 'react';
import { useStore } from '../../store/useStore';

export const ControlCenter: React.FC = () => {
  const { controlPanel, closeControlPanel, wallpaper } = useStore();

  if (controlPanel !== 'controlCenter') return null;

  const wallpapers = [
    'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500',
    'bg-gradient-to-br from-green-600 via-teal-500 to-blue-600',
    'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500',
    'bg-gradient-to-br from-purple-600 via-pink-500 to-red-600',
  ];

  const changeWallpaper = (index: number) => {
    // Will be implemented via store
  };

  return (
    <div className="fixed top-7 right-2 z-[10000]" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white/25 backdrop-blur-xl border border-white/30 rounded-2xl p-3 w-80 shadow-2xl">
        {/* Quick Controls */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { icon: '📶', label: 'WiFi', active: true },
            { icon: '🔵', label: '蓝牙', active: true },
            { icon: '📡', label: 'AirDrop', active: true },
            { icon: '🌐', label: '聚焦', active: false },
          ].map((item, i) => (
            <button
              key={i}
              className={`p-3 rounded-xl flex flex-col items-center ${item.active ? 'bg-blue-500/50' : 'bg-gray-500/30'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1 text-white">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
            <span className="text-lg">☀️</span>
            <input type="range" className="flex-1 accent-white" defaultValue={80} />
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
            <span className="text-lg">🔊</span>
            <input type="range" className="flex-1 accent-white" defaultValue={60} />
          </div>
        </div>

        {/* Now Playing */}
        <div className="mt-3 bg-white/20 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            🎵
          </div>
          <div className="flex-1">
            <div className="text-sm text-white font-medium">正在播放</div>
            <div className="text-xs text-gray-300">歌曲名称</div>
          </div>
          <div className="flex gap-2">
            <button className="text-white">⏮️</button>
            <button className="text-white">▶️</button>
            <button className="text-white">⏭️</button>
          </div>
        </div>
      </div>

      {/* Backdrop for closing */}
      <div className="fixed inset-0 -z-10" onClick={closeControlPanel} />
    </div>
  );
};
```

---

## Task 8: NotificationCenter 组件

**Files:**
- Create: `src/components/NotificationCenter/NotificationCenter.tsx`

- [ ] **Step 1: 创建 NotificationCenter**

```tsx
import React from 'react';
import { useStore } from '../../store/useStore';

export const NotificationCenter: React.FC = () => {
  const { controlPanel, closeControlPanel } = useStore();

  if (controlPanel !== 'notificationCenter') return null;

  const notifications = [
    { id: 1, title: '备忘录', message: '你有 3 条新备忘录', time: '现在' },
    { id: 2, title: '日历', message: '下午 3:00 会议', time: '1小时前' },
    { id: 3, title: 'Safari', message: '更新已下载', time: '2小时前' },
  ];

  return (
    <div className="fixed top-7 right-2 z-[10000]" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white/25 backdrop-blur-xl border border-white/30 rounded-2xl p-4 w-80 shadow-2xl">
        <div className="text-lg font-semibold text-white mb-4">通知</div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white/20 rounded-xl p-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-white">{notif.title}</span>
                <span className="text-xs text-gray-300">{notif.time}</span>
              </div>
              <p className="text-xs text-gray-200 mt-1">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 -z-10" onClick={closeControlPanel} />
    </div>
  );
};
```

---

## Task 9: Desktop 组件

**Files:**
- Create: `src/components/Desktop/Desktop.tsx`
- Create: `src/components/Desktop/DesktopIcon.tsx`

- [ ] **Step 1: 创建 Desktop.tsx**

```tsx
import React from 'react';
import { useStore } from '../../store/useStore';
import { DesktopIcon } from './DesktopIcon';

export const Desktop: React.FC = () => {
  const { launchApp } = useStore();

  const desktopItems = [
    { id: 'documents', icon: '📁', name: 'Documents' },
    { id: 'downloads', icon: '⬇️', name: 'Downloads' },
    { id: 'desktop', icon: '🖥️', name: 'macOS' },
  ];

  return (
    <div
      className="fixed inset-0 pt-7 pb-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 25%, #bf5af2 50%, #ff375f 75%, #ff9f0a 100%)',
      }}
    >
      <div className="grid grid-cols-6 gap-4 p-4">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            icon={item.icon}
            name={item.name}
            onDoubleClick={() => launchApp('finder')}
          />
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: 创建 DesktopIcon.tsx**

```tsx
import React, { useState } from 'react';

interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, name, onDoubleClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-150
        hover:bg-white/20
        ${isSelected ? 'bg-white/30 ring-2 ring-white/50' : ''}
      `}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <span className="text-5xl mb-1 drop-shadow-lg">{icon}</span>
      <span className="text-xs text-white text-center drop-shadow-md font-medium px-1 py-0.5 rounded bg-black/20">
        {name}
      </span>
    </div>
  );
};
```

---

## Task 10: App 整合

**Files:**
- Update: `src/App.tsx`

- [ ] **Step 1: 更新 App.tsx**

```tsx
import { MenuBar } from './components/MenuBar/MenuBar';
import { Desktop } from './components/Desktop/Desktop';
import { Dock } from './components/Dock/Dock';
import { ControlCenter } from './components/ControlCenter/ControlCenter';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { WindowManager } from './components/Window/WindowManager';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Desktop Background */}
      <Desktop />

      {/* System UI - Fixed positions */}
      <MenuBar />
      <Dock />
      <ControlCenter />
      <NotificationCenter />

      {/* Window Layer */}
      <WindowManager />
    </div>
  );
}

export default App;
```

---

## Task 11: 构建验证

- [ ] **Step 1: 运行构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 2: 启动开发服务器**

Run: `npm run dev`

---

## 自检清单

- [ ] 所有组件都渲染到正确位置
- [ ] 窗口可以拖拽、缩放、最小化、最大化、关闭
- [ ] Dock 图标点击启动应用
- [ ] Control Center 和 Notification Center 可切换
- [ ] 毛玻璃效果正常显示
