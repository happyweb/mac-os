# macOS 操作演示系统 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个纯前端的 macOS 文件操作交互式演练系统，用户在模拟的 macOS 界面上执行操作完成任务

**Architecture:** React + TypeScript + Tailwind CSS + Zustand 单页应用。使用 Zustand 管理文件系统和演练状态，组件通过 props/回调与 store 交互。

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Zustand, Vite

---

## 文件结构

```
mac-operation-demo/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── store/
    │   └── useStore.ts
    ├── data/
    │   └── scenarios.ts
    └── components/
        ├── TitleBar.tsx
        ├── StepPanel.tsx
        ├── DesktopArea.tsx
        ├── FinderWindow.tsx
        ├── ContextMenu.tsx
        └── ResultModal.tsx
```

---

## Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "mac-operation-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.0",
    "vite": "^5.1.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: 创建 vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: 创建 tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 6: 创建 postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>macOS 操作演示</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: 创建 src/index.css**

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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
```

- [ ] **Step 9: 创建 src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 10: 安装依赖**

Run: `cd /Users/web/Downloads/macos && npm install`

Expected: 安装成功，无报错

---

## Task 2: 类型定义

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: 创建类型定义**

```typescript
export type ActionType =
  | 'doubleClick'
  | 'rightClick'
  | 'selectMenu'
  | 'drag'
  | 'createFolder';

export interface Step {
  id: string;
  instruction: string;
  action: ActionType;
  target?: string;
  menuItem?: string;
  expectedResult: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  children?: FileNode[];
  parent?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  initialFileSystem: FileNode[];
}

export interface StepResult {
  stepId: string;
  passed: boolean;
  actualAction?: ActionType;
}
```

---

## Task 3: 状态管理 (Zustand Store)

**Files:**
- Create: `src/store/useStore.ts`

- [ ] **Step 1: 创建 Zustand Store**

```typescript
import { create } from 'zustand';
import { FileNode, Step, StepResult } from '../types';
import { scenario1 } from '../data/scenarios';

interface AppState {
  // 文件系统
  fileSystem: FileNode[];
  currentFolderId: string;

  // 演练状态
  currentStepIndex: number;
  stepResults: StepResult[];
  isCompleted: boolean;

  // 右键菜单
  contextMenu: { x: number; y: number; targetId: string } | null;

  // Actions - 文件系统
  setCurrentFolder: (folderId: string) => void;
  navigateBack: () => void;
  addFolder: (name: string, parentId: string) => void;
  deleteItem: (itemId: string) => void;
  renameItem: (itemId: string, newName: string) => void;

  // Actions - 演练
  recordStepResult: (result: StepResult) => void;
  nextStep: () => void;
  resetScenario: () => void;

  // Actions - 菜单
  openContextMenu: (x: number, y: number, targetId: string) => void;
  closeContextMenu: () => void;

  // Helpers
  getCurrentFolder: () => FileNode | undefined;
  getItemById: (id: string) => FileNode | undefined;
  getParentFolder: () => FileNode | undefined;
}

export const useStore = create<AppState>((set, get) => ({
  // 初始状态
  fileSystem: scenario1.initialFileSystem,
  currentFolderId: 'desktop',
  currentStepIndex: 0,
  stepResults: [],
  isCompleted: false,
  contextMenu: null,

  // 文件系统 Actions
  setCurrentFolder: (folderId) => set({ currentFolderId: folderId }),

  navigateBack: () => {
    const parent = get().getParentFolder();
    if (parent) {
      set({ currentFolderId: parent.id });
    }
  },

  addFolder: (name, parentId) => {
    set((state) => {
      const newFolder: FileNode = {
        id: `folder-${Date.now()}`,
        name,
        type: 'folder',
        icon: '📁',
        parent: parentId,
      };

      const updateChildren = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newFolder],
            };
          }
          if (node.children) {
            return { ...node, children: updateChildren(node.children) };
          }
          return node;
        });
      };

      return { fileSystem: updateChildren(state.fileSystem) };
    });
  },

  deleteItem: (itemId) => {
    set((state) => {
      const removeItem = (nodes: FileNode[]): FileNode[] => {
        return nodes
          .filter((node) => node.id !== itemId)
          .map((node) => ({
            ...node,
            children: node.children ? removeItem(node.children) : undefined,
          }));
      };

      const updateParents = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => ({
          ...node,
          children: node.children ? removeItemAndUpdate(node.children) : undefined,
        }));
      };

      const removeItemAndUpdate = (nodes: FileNode[]): FileNode[] => {
        return nodes
          .filter((node) => node.id !== itemId)
          .map((node) => ({
            ...node,
            children: node.children ? removeItemAndUpdate(node.children) : undefined,
          }));
      };

      return { fileSystem: updateParents(state.fileSystem) };
    });
  },

  renameItem: (itemId, newName) => {
    set((state) => {
      const updateName = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === itemId) {
            return { ...node, name: newName };
          }
          if (node.children) {
            return { ...node, children: updateName(node.children) };
          }
          return node;
        });
      };
      return { fileSystem: updateName(state.fileSystem) };
    });
  },

  // 演练 Actions
  recordStepResult: (result) => {
    set((state) => ({
      stepResults: [...state.stepResults, result],
    }));
  },

  nextStep: () => {
    set((state) => {
      const nextIndex = state.currentStepIndex + 1;
      const totalSteps = scenario1.steps.length;
      return {
        currentStepIndex: nextIndex,
        isCompleted: nextIndex >= totalSteps,
      };
    });
  },

  resetScenario: () => {
    set({
      fileSystem: scenario1.initialFileSystem,
      currentFolderId: 'desktop',
      currentStepIndex: 0,
      stepResults: [],
      isCompleted: false,
      contextMenu: null,
    });
  },

  // 菜单 Actions
  openContextMenu: (x, y, targetId) => {
    set({ contextMenu: { x, y, targetId } });
  },

  closeContextMenu: () => {
    set({ contextMenu: null });
  },

  // Helpers
  getCurrentFolder: () => {
    const { fileSystem, currentFolderId } = get();
    if (currentFolderId === 'desktop') return undefined;
    const findFolder = (nodes: FileNode[]): FileNode | undefined => {
      for (const node of nodes) {
        if (node.id === currentFolderId) return node;
        if (node.children) {
          const found = findFolder(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findFolder(fileSystem);
  },

  getItemById: (id) => {
    const { fileSystem } = get();
    const findItem = (nodes: FileNode[]): FileNode | undefined => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findItem(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findItem(fileSystem);
  },

  getParentFolder: () => {
    const { fileSystem, currentFolderId } = get();
    if (currentFolderId === 'desktop') return undefined;
    const findParent = (nodes: FileNode[], parent?: FileNode): FileNode | undefined => {
      for (const node of nodes) {
        if (node.id === currentFolderId) return parent;
        if (node.children) {
          const found = findParent(node.children, node);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findParent(fileSystem);
  },
}));
```

---

## Task 4: 演练场景数据

**Files:**
- Create: `src/data/scenarios.ts`

- [ ] **Step 1: 创建场景数据**

```typescript
import { Scenario } from '../types';

export const scenario1: Scenario = {
  id: 'file-management-basics',
  title: '文件管理基础',
  description: '学习基本的文件管理操作',
  steps: [
    {
      id: 'step-1',
      instruction: '双击打开 Documents 文件夹',
      action: 'doubleClick',
      target: 'documents',
      expectedResult: '打开了 Documents 文件夹',
    },
    {
      id: 'step-2',
      instruction: '在空白处右键，点击"新建文件夹"',
      action: 'selectMenu',
      target: 'documents',
      menuItem: '新建文件夹',
      expectedResult: '创建了新文件夹',
    },
    {
      id: 'step-3',
      instruction: '将新文件夹命名为"项目"',
      action: 'selectMenu',
      target: 'new-folder',
      menuItem: '重命名',
      expectedResult: '文件夹已命名为"项目"',
    },
    {
      id: 'step-4',
      instruction: '将 notes.txt 拖入"项目"文件夹',
      action: 'drag',
      target: 'notes-txt',
      expectedResult: '文件已移动到项目文件夹',
    },
    {
      id: 'step-5',
      instruction: '返回桌面',
      action: 'doubleClick',
      target: 'desktop',
      expectedResult: '返回桌面',
    },
  ],
  initialFileSystem: [
    {
      id: 'desktop',
      name: '桌面',
      type: 'folder',
      icon: '🖥️',
      children: [
        {
          id: 'documents',
          name: 'Documents',
          type: 'folder',
          icon: '📁',
          parent: 'desktop',
          children: [
            {
              id: 'notes-txt',
              name: 'notes.txt',
              type: 'file',
              icon: '📄',
              parent: 'documents',
            },
            {
              id: 'old-file',
              name: '旧文件.txt',
              type: 'file',
              icon: '📄',
              parent: 'documents',
            },
          ],
        },
        {
          id: 'trash',
          name: '废纸篓',
          type: 'folder',
          icon: '🗑️',
          parent: 'desktop',
        },
      ],
    },
  ],
};
```

---

## Task 5: TitleBar 组件

**Files:**
- Create: `src/components/TitleBar.tsx`

- [ ] **Step 1: 创建 TitleBar 组件**

```tsx
import React from 'react';

interface TitleBarProps {
  title: string;
  onClose?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="h-8 bg-gray-800/80 backdrop-blur-xl flex items-center px-4 border-b border-white/10 rounded-t-2xl">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
      </div>
      <div className="flex-1 text-center text-sm text-gray-300">{title}</div>
    </div>
  );
};
```

---

## Task 6: StepPanel 组件

**Files:**
- Create: `src/components/StepPanel.tsx`

- [ ] **Step 1: 创建 StepPanel 组件**

```tsx
import React from 'react';
import { useStore } from '../store/useStore';
import { scenario1 } from '../data/scenarios';

export const StepPanel: React.FC = () => {
  const { currentStepIndex, stepResults } = useStore();
  const steps = scenario1.steps;

  const getStepStatus = (index: number) => {
    const result = stepResults.find((r) => r.stepId === steps[index].id);
    if (result) {
      return result.passed ? 'passed' : 'failed';
    }
    if (index === currentStepIndex) {
      return 'current';
    }
    return 'pending';
  };

  return (
    <div className="w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-2">
        {scenario1.title}
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        {scenario1.description}
      </p>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={step.id}
              className={`
                p-4 rounded-xl transition-all duration-300
                ${status === 'current' ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50' : 'bg-white/5 border border-transparent'}
                ${status === 'passed' ? 'opacity-60' : ''}
                ${status === 'failed' ? 'opacity-60 border border-red-400/50' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium
                    ${status === 'passed' ? 'bg-green-500 text-white' : ''}
                    ${status === 'failed' ? 'bg-red-500 text-white' : ''}
                    ${status === 'current' ? 'bg-purple-500 text-white animate-pulse' : ''}
                    ${status === 'pending' ? 'bg-gray-600 text-gray-300' : ''}
                  `}
                >
                  {status === 'passed' ? '✓' : status === 'failed' ? '✗' : index + 1}
                </div>
                <span
                  className={`
                    text-sm
                    ${status === 'current' ? 'text-white font-medium' : 'text-gray-300'}
                    ${status === 'passed' ? 'text-green-300' : ''}
                    ${status === 'failed' ? 'text-red-300' : ''}
                  `}
                >
                  {step.instruction}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

---

## Task 7: ContextMenu 组件

**Files:**
- Create: `src/components/ContextMenu.tsx`

- [ ] **Step 1: 创建 ContextMenu 组件**

```tsx
import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

interface MenuItem {
  label: string;
  action: () => void;
  danger?: boolean;
}

export const ContextMenu: React.FC = () => {
  const { contextMenu, closeContextMenu, addFolder, deleteItem } = useStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };

    if (contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu, closeContextMenu]);

  if (!contextMenu) return null;

  const menuItems: MenuItem[] = [
    {
      label: '打开',
      action: () => {
        closeContextMenu();
      },
    },
    {
      label: '复制',
      action: () => {
        closeContextMenu();
      },
    },
    {
      label: '粘贴',
      action: () => {
        closeContextMenu();
      },
    },
    {
      label: '新建文件夹',
      action: () => {
        addFolder('新建文件夹', contextMenu.targetId);
        closeContextMenu();
      },
    },
    {
      label: '重命名',
      action: () => {
        const newName = prompt('请输入新名称:');
        if (newName) {
          const { renameItem } = useStore.getState();
          renameItem(contextMenu.targetId, newName);
        }
        closeContextMenu();
      },
    },
    {
      label: '删除',
      action: () => {
        deleteItem(contextMenu.targetId);
        closeContextMenu();
      },
      danger: true,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl py-2 min-w-48"
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`
            w-full px-4 py-2 text-left text-sm transition-colors
            ${item.danger ? 'text-red-400 hover:bg-red-500/20' : 'text-gray-200 hover:bg-white/10'}
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
```

---

## Task 8: DesktopArea 组件

**Files:**
- Create: `src/components/DesktopArea.tsx`

- [ ] **Step 1: 创建 DesktopArea 组件**

```tsx
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { TitleBar } from './TitleBar';
import { FileNode } from '../types';

interface DesktopItemProps {
  item: FileNode;
  onDoubleClick: (id: string) => void;
  onRightClick: (e: React.MouseEvent, id: string) => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, targetId: string) => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  item,
  onDoubleClick,
  onRightClick,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, item.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop?.(e, item.id)}
      onDoubleClick={() => onDoubleClick(item.id)}
      onContextMenu={(e) => onRightClick(e, item.id)}
      className={`
        flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-200
        hover:bg-white/10
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      <span className="text-4xl mb-2">{item.icon}</span>
      <span className="text-xs text-white text-center select-none truncate w-20">
        {item.name}
      </span>
    </div>
  );
};

export const DesktopArea: React.FC = () => {
  const { fileSystem, currentFolderId, setCurrentFolder, navigateBack, openContextMenu, recordStepResult, nextStep } = useStore();
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const desktopFolder = fileSystem.find((f) => f.id === 'desktop');
  const desktopItems = desktopFolder?.children || [];

  const currentFolder = fileSystem.find((f) => f.id === currentFolderId);
  const displayItems = currentFolderId === 'desktop' ? desktopItems : (currentFolder?.children || []);

  const handleDoubleClick = (id: string) => {
    const item = fileSystem.find((f) => f.id === id);
    if (item?.type === 'folder') {
      setCurrentFolder(id);
      recordStepResult({ stepId: `step-${useStore.getState().currentStepIndex + 1}`, passed: true });
      nextStep();
    }
  };

  const handleRightClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    openContextMenu(e.clientX, e.clientY, id);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId && sourceId !== targetId) {
      // Handle drag and drop logic
      console.log(`Moved ${sourceId} to ${targetId}`);
    }
    setDraggedId(null);
  };

  const handleBackClick = () => {
    navigateBack();
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
      <TitleBar title={currentFolder?.name || '桌面'} />

      {currentFolderId !== 'desktop' && (
        <div className="px-4 py-2 bg-gray-800/50 flex items-center gap-2">
          <button
            onClick={handleBackClick}
            className="px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            ← 返回
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-sm text-gray-300">{currentFolder?.name}</span>
        </div>
      )}

      <div className="p-6 h-[calc(100%-8rem)]">
        <div
          className="grid grid-cols-5 gap-4 h-full content-start"
          onContextMenu={(e) => {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, currentFolderId);
          }}
        >
          {displayItems.map((item) => (
            <DesktopItem
              key={item.id}
              item={item}
              onDoubleClick={handleDoubleClick}
              onRightClick={handleRightClick}
              isDragging={draggedId === item.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## Task 9: FinderWindow 组件

**Files:**
- Create: `src/components/FinderWindow.tsx`

- [ ] **Step 1: 创建 FinderWindow 组件**

```tsx
import React from 'react';
import { TitleBar } from './TitleBar';

interface FinderWindowProps {
  children: React.ReactNode;
  title?: string;
}

export const FinderWindow: React.FC<FinderWindowProps> = ({ children, title = '访达' }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
      <TitleBar title={title} />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
```

---

## Task 10: ResultModal 组件

**Files:**
- Create: `src/components/ResultModal.tsx`

- [ ] **Step 1: 创建 ResultModal 组件**

```tsx
import React from 'react';
import { useStore } from '../store/useStore';

export const ResultModal: React.FC = () => {
  const { isCompleted, stepResults, resetScenario } = useStore();

  if (!isCompleted) return null;

  const passedCount = stepResults.filter((r) => r.passed).length;
  const totalCount = stepResults.length;
  const passRate = Math.round((passedCount / totalCount) * 100);

  const handleRestart = () => {
    resetScenario();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-6xl mb-4">{passRate >= 80 ? '🎉' : passRate >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {passRate >= 80 ? '太棒了！' : passRate >= 50 ? '做得不错！' : '继续加油！'}
          </h2>
          <p className="text-gray-300 mb-6">
            你完成了 {passedCount}/{totalCount} 个步骤，正确率 {passRate}%
          </p>

          <div className="space-y-2 mb-8">
            {stepResults.map((result, index) => (
              <div
                key={result.stepId}
                className={`flex items-center gap-2 text-sm ${result.passed ? 'text-green-300' : 'text-red-300'}`}
              >
                <span>{result.passed ? '✓' : '✗'}</span>
                <span>步骤 {index + 1}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            再来一次
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## Task 11: App 组件整合

**Files:**
- Create: `src/App.tsx`

- [ ] **Step 1: 创建 App 组件**

```tsx
import React from 'react';
import { StepPanel } from './components/StepPanel';
import { DesktopArea } from './components/DesktopArea';
import { ContextMenu } from './components/ContextMenu';
import { ResultModal } from './components/ResultModal';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-8 flex gap-8">
        <StepPanel />
        <DesktopArea />
      </div>

      {/* Overlays */}
      <ContextMenu />
      <ResultModal />
    </div>
  );
}

export default App;
```

---

## Task 12: 构建测试

**Files:**
- Modify: `package.json` (添加 homepage)

- [ ] **Step 1: 运行构建**

Run: `npm run build`
Expected: 构建成功，生成 dist 目录

- [ ] **Step 2: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器启动在 http://localhost:5173

---

## 自检清单

- [ ] Spec 覆盖：所有设计文档中的功能都有对应任务
- [ ] 无占位符：无 TBD、TODO 或未完成的代码块
- [ ] 类型一致性：类型定义与组件使用一致
- [ ] 组件完整性：所有组件都有完整实现

---

**Plan complete.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**