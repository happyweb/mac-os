import { create } from 'zustand';
import { WindowState, DockApp, ControlPanelType, MenuBarApp } from '../types';

interface AppState {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
  controlPanel: ControlPanelType;
  dockApps: DockApp[];
  menuBarApps: MenuBarApp[];
  activeMenuBarApp: string;
  wallpaper: string;

  openWindow: (appId: string, title: string, url?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  focusWindow: (id: string) => void;
  openControlPanel: (panel: ControlPanelType) => void;
  closeControlPanel: () => void;
  openLaunchPad: () => void;
  closeLaunchPad: () => void;
  launchApp: (appId: string) => void;
  setActiveMenuBarApp: (appId: string) => void;
}

const titles: Record<string, string> = {
  finder: '访达',
  settings: 'Facebook',
  terminal: '终端',
  notes: 'Xcode',
  safari: 'Safari',
  launchpad: 'App Store',
  mail: 'Google Chrome',
  photos: 'Microsoft Word',
  calendar: 'Web Storm',
  reminders: 'Visual Studio Code',
  music: '音乐',
  appstore: 'App Store',
  excel: 'Microsoft Excel',
  xmind: 'Xmind',
  postman: 'Postman',
  zoom: 'Zoom',
  email: 'Email',
  docker: 'Docker',
};

const appUrls: Record<string, string> = {
  safari: 'https://www.baidu.com',
  mail: 'https://www.baidu.com',
};

export const useStore = create<AppState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
  controlPanel: 'none',
  wallpaper: 'gradient',
  activeMenuBarApp: 'finder',
  menuBarApps: [
    { id: 'finder', name: '访达' },
  ],
  dockApps: [
    { id: 'launchpad', name: '启动台', icon: 'rocket', iconColor: '#5AC8FA', isRunning: false },
    { id: 'finder', name: '访达', icon: 'finder', iconColor: '#5AC8FA', isRunning: false },
    { id: 'safari', name: 'Safari', icon: 'safari', iconColor: '#007AFF', isRunning: false },
    { id: 'mail', name: '邮件', icon: 'mail', iconColor: '#007AFF', isRunning: false },
    { id: 'notes', name: '备忘录', icon: 'notes', iconColor: '#FFCC00', isRunning: false },
    { id: 'reminders', name: '提醒事项', icon: 'reminders', iconColor: '#FF9500', isRunning: false },
    { id: 'calendar', name: '日历', icon: 'calendar', iconColor: '#FF3B30', isRunning: false },
    { id: 'photos', name: '照片', icon: 'photos', iconColor: '#FF375F', isRunning: false },
    { id: 'music', name: '音乐', icon: 'music', iconColor: '#FC3C44', isRunning: false },
    { id: 'terminal', name: '终端', icon: 'terminal', iconColor: '#30D158', isRunning: false },
    { id: 'settings', name: '系统设置', icon: 'settings', iconColor: '#8E8E93', isRunning: false },
    { id: 'appstore', name: 'App Store', icon: 'appstore', iconColor: '#007AFF', isRunning: false },
  ],

  openWindow: (appId, title, url) => {
    const windowWidth = 1200;
    const windowHeight = 800;
    set((state) => {
      const id = `${appId}-${Date.now()}`;
      const baseX = Math.max(0, (window.innerWidth - windowWidth) / 2);
      const baseY = Math.max(28, (window.innerHeight - windowHeight) / 2 - 50);
      const offsetX = state.windows.length * 30;
      const offsetY = state.windows.length * 30;
      return {
        windows: [
          ...state.windows,
          {
            id,
            appId,
            title,
            url,
            position: { x: baseX + offsetX, y: baseY + offsetY },
            size: { width: windowWidth, height: windowHeight },
            isMinimized: false,
            isMaximized: false,
            zIndex: state.nextZIndex,
          },
        ],
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1,
        activeMenuBarApp: appId,
      };
    });
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
    const window = get().windows.find((w) => w.id === id);
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      activeWindowId: id,
      activeMenuBarApp: window?.appId || state.activeMenuBarApp,
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  openControlPanel: (panel) => {
    set({ controlPanel: panel });
  },

  closeControlPanel: () => {
    set({ controlPanel: 'none' });
  },

  openLaunchPad: () => {
    set({ controlPanel: 'launchPad' });
  },

  closeLaunchPad: () => {
    set({ controlPanel: 'none' });
  },

  launchApp: (appId) => {
    set((state) => ({
      dockApps: state.dockApps.map((app) =>
        app.id === appId ? { ...app, isRunning: true } : app
      ),
      activeMenuBarApp: appId,
    }));
    get().openWindow(appId, titles[appId] || appId, appUrls[appId]);
  },

  setActiveMenuBarApp: (appId) => {
    set({ activeMenuBarApp: appId });
  },
}));
