export interface WindowState {
  id: string;
  appId: string;
  title: string;
  url?: string;
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
  iconColor?: string;
  isRunning: boolean;
}

export interface MenuBarApp {
  id: string;
  name: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

export type ControlPanelType = 'none' | 'controlCenter' | 'notificationCenter' | 'launchPad';
