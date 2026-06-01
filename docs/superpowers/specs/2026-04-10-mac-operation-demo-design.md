# macOS 操作演示系统 - 设计文档

## 概述

纯前端 React + Tailwind CSS 构建的 macOS 文件操作交互式演练系统。用户通过在模拟的 macOS 界面上执行操作来完成预设任务，系统记录并评判操作正确性。

## 视觉风格

### 整体布局
- **背景**：渐变紫蓝色 (`from-purple-600 to-blue-500`)，带有动态浮动的抽象形状
- **毛玻璃效果**：`backdrop-blur-xl` + 半透明白色 (`bg-white/10`)

### 窗口样式
- 圆角：16px
- 边框：`border border-white/20`
- 阴影：`shadow-2xl`
- 标题栏：深色毛玻璃，带红/黄/绿窗口按钮

### 图标
- 使用 emoji 代替真实图标
- 文件夹：📁
- 文件：📄
- 回收站：🗑️

## 核心组件

### 1. StepPanel（步骤面板）
- 左侧固定卡片，毛玻璃背景
- 步骤列表，每项显示序号和描述
- 当前步骤高亮（渐变背景）
- 已完成步骤显示 ✓ 图标
- 错误步骤显示 ✗ 图标

### 2. DesktopArea（桌面区域）
- 模拟 macOS 桌面
- 显示桌面图标（文件夹、回收站）
- 支持双击打开文件夹
- 支持右键菜单（复制/粘贴/重命名/删除）
- 支持拖拽操作

### 3. FinderWindow（访达窗口）
- 仿 macOS 窗口样式
- 工具栏（后退/前进、路径栏）
- 图标网格视图
- 支持选择、右键操作

### 4. ContextMenu（右键菜单）
- 毛玻璃弹出菜单
- 选项：打开、复制、粘贴、重命名、删除、新建文件夹
- 点击外部关闭

### 5. ResultModal（结果模态框）
- 演练完成后的总结弹窗
- 显示正确率、通过/失败状态
- 重新开始按钮

## 操作类型

| 操作 | 触发方式 | 评判条件 |
|------|----------|----------|
| 双击打开 | 双击图标 | 是否双击了指定的文件夹 |
| 右键菜单 | 右键点击 | 是否在正确位置右键 |
| 选择菜单项 | 点击菜单选项 | 是否选择了正确的操作 |
| 拖拽 | 拖动图标 | 是否拖拽到目标位置 |
| 新建文件夹 | 菜单操作 | 是否创建了文件夹 |

## 数据结构

### Step（步骤）
```typescript
interface Step {
  id: string;
  instruction: string;      // "双击打开 Documents 文件夹"
  action: ActionType;       // 操作类型
  target?: string;          // 目标元素ID
  expectedResult: string;   // 预期结果描述
}
```

### ActionType
```typescript
type ActionType =
  | 'doubleClick'
  | 'rightClick'
  | 'selectMenu'
  | 'drag'
  | 'createFolder';
```

### FileSystem
```typescript
interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  parent?: string;
}
```

## 演练场景示例

### 场景：文件管理基础

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 双击 Documents | 打开文档文件夹 |
| 2 | 右键新建文件夹 | 创建新文件夹 |
| 3 | 将文件夹命名为 "项目" | 重命名操作 |
| 4 | 将 "笔记.txt" 拖入 "项目" | 移动文件 |
| 5 | 右键删除 "旧文件.txt" | 删除操作 |

## 技术栈

- **React 18** + TypeScript
- **Tailwind CSS**（含 custom animation）
- **Zustand**（状态管理）
- **Vite**（构建工具）

## 目录结构

```
src/
├── components/
│   ├── StepPanel.tsx
│   ├── DesktopArea.tsx
│   ├── FinderWindow.tsx
│   ├── ContextMenu.tsx
│   ├── TitleBar.tsx
│   └── ResultModal.tsx
├── store/
│   └── useStore.ts
├── data/
│   └── scenarios.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 实现优先级

1. 基础布局 + 毛玻璃样式
2. 桌面图标渲染
3. 文件系统状态管理
4. 双击打开文件夹
5. 右键菜单
6. 步骤面板 + 评判逻辑
7. 拖拽功能
8. 结果弹窗
