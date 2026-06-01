# LaunchPad 控制台实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 实现一个仿 macOS LaunchPad 的快捷启动面板，通过菜单栏图标点击打开，显示应用图标网格

**架构：** 新建独立 LaunchPad 组件，覆盖全屏显示，使用 Zustand store 管理开关状态，图标数据复用 dockApps

**技术栈：** React, TypeScript, Tailwind CSS, Zustand

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/types/index.ts` | 添加 `'launchPad'` 到 `ControlPanelType` |
| `src/store/useStore.ts` | 添加 `openLaunchPad` / `closeLaunchPad` 方法 |
| `src/components/LaunchPad/LaunchPad.tsx` | 主组件，全屏覆盖层，图标网格布局 |
| `src/components/LaunchPad/LaunchPadIcon.tsx` | 单个图标组件 |
| `src/components/MenuBar/MenuBar.tsx` | 添加 LaunchPad 图标按钮 |

---

## Task 1: 更新类型定义

**Files:**
- Modify: `src/types/index.ts:33`

- [ ] **Step 1: 修改 ControlPanelType**

```typescript
export type ControlPanelType = 'none' | 'controlCenter' | 'notificationCenter' | 'launchPad';
```

---

## Task 2: 更新 Store

**Files:**
- Modify: `src/store/useStore.ts`

- [ ] **Step 1: 添加 openLaunchPad 和 closeLaunchPad 方法**

在 `AppState` 接口中添加：
```typescript
openLaunchPad: () => void;
closeLaunchPad: () => void;
```

实现：
```typescript
openLaunchPad: () => {
  set({ controlPanel: 'launchPad' });
},

closeLaunchPad: () => {
  set({ controlPanel: 'none' });
},
```

---

## Task 3: 创建 LaunchPadIcon 组件

**Files:**
- Create: `src/components/LaunchPad/LaunchPadIcon.tsx`

- [ ] **Step 1: 创建 LaunchPadIcon 组件**

```tsx
import React from 'react';
import { MacOSIcon } from '../MacOSIcon';

interface LaunchPadIconProps {
  name: string;
  label: string;
  iconKey: string;
  onClick: () => void;
}

export const LaunchPadIcon: React.FC<LaunchPadIconProps> = ({
  name,
  label,
  iconKey,
  onClick,
}) => {
  return (
    <button
      className="flex flex-col items-center gap-2 group cursor-pointer"
      onClick={onClick}
    >
      <div
        className="transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-2"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
        }}
      >
        <MacOSIcon name={iconKey} size={72} useImage={true} />
      </div>
      <span className="text-white text-[12px] font-medium text-shadow text-center w-full truncate px-1">
        {label}
      </span>
    </button>
  );
};
```

---

## Task 4: 创建 LaunchPad 主组件

**Files:**
- Create: `src/components/LaunchPad/LaunchPad.tsx`

- [ ] **Step 1: 创建 LaunchPad 主组件**

```tsx
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { LaunchPadIcon } from './LaunchPadIcon';

export const LaunchPad = () => {
  const { controlPanel, closeLaunchPad, launchApp, dockApps } = useStore();

  if (controlPanel !== 'launchPad') return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLaunchPad();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLaunchPad]);

  const handleAppClick = (appId: string) => {
    launchApp(appId);
    closeLaunchPad();
  };

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={closeLaunchPad}
    >
      <div
        className="bg-white/20 backdrop-blur-xl rounded-3xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-5 gap-6">
          {dockApps.map((app) => (
            <LaunchPadIcon
              key={app.id}
              name={app.name}
              label={app.name}
              iconKey={app.icon}
              onClick={() => handleAppClick(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## Task 5: 更新 MenuBar 添加 LaunchPad 图标

**Files:**
- Modify: `src/components/MenuBar/MenuBar.tsx`

- [ ] **Step 1: 在 MenuBar 添加 LaunchPad 图标按钮**

在右侧图标区域（Notification Center 旁边）添加：

```tsx
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
```

并从 store 导入 `openLaunchPad`。

---

## Task 6: 在 App.tsx 中渲染 LaunchPad

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 在 App.tsx 添加 LaunchPad 组件**

在 ControlCenter 和 NotificationCenter 附近添加：

```tsx
import { LaunchPad } from './components/LaunchPad/LaunchPad';

function App() {
  // ... existing code

  return (
    <>
      {/* ... existing components */}
      <ControlCenter />
      <NotificationCenter />
      <LaunchPad />
      {/* ... existing components */}
    </>
  );
}
```

---

## 自检清单

- [ ] `controlPanel` 类型包含 `'launchPad'`
- [ ] `useStore` 有 `openLaunchPad` 和 `closeLaunchPad`
- [ ] `LaunchPadIcon` 组件存在且可复用
- [ ] `LaunchPad` 组件监听 ESC 键关闭
- [ ] 点击应用图标会启动应用并关闭 LaunchPad
- [ ] MenuBar 有 LaunchPad 图标且能正常打开
- [ ] LaunchPad 在 App.tsx 中被渲染
