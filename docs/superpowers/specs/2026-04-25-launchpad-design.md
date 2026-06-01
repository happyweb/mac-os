# LaunchPad 控制台设计

## 概述

仿 macOS LaunchPad 的快捷启动面板，通过菜单栏图标点击打开，覆盖全屏显示应用图标网格。

## 功能需求

- 点击菜单栏 LaunchPad 图标打开
- 全屏显示所有应用图标（网格布局）
- 点击图标启动对应应用
- 点击空白处或按 ESC 关闭
- 使用 Dock 中的图标

## 组件结构

### 新增文件

| 文件 | 职责 |
|------|------|
| `src/components/LaunchPad/LaunchPad.tsx` | 主组件，全屏覆盖层，图标网格布局 |
| `src/components/LaunchPad/LaunchPadIcon.tsx` | 单个图标组件，图标 + 名称 + 悬停效果 |

### 修改文件

| 文件 | 变更 |
|------|------|
| `src/types/index.ts` | `ControlPanelType` 添加 `'launchPad'` |
| `src/store/useStore.ts` | 添加 `openLaunchPad` / `closeLaunchPad` 方法 |
| `src/components/MenuBar/MenuBar.tsx` | 添加 LaunchPad 图标按钮 |

## 布局

- **位置**：固定定位，覆盖整个视口
- **背景**：半透明黑色背景 `bg-black/30 backdrop-blur-sm`
- **图标网格**：5列 × 2行，居中显示
- **图标间距**：24px
- **图标大小**：80px（含名称区域）

## 交互

| 操作 | 行为 |
|------|------|
| 点击 LaunchPad 图标 | 打开 LaunchPad 全屏覆盖 |
| 点击应用图标 | 启动应用，关闭 LaunchPad |
| 点击空白处 | 关闭 LaunchPad |
| 按 ESC 键 | 关闭 LaunchPad |

## 样式

- 背景：`bg-black/30 backdrop-blur-sm`
- 图标悬停：scale(1.1) + 向上偏移 8px
- 图标圆角：18px
- 名称文字：白色，带阴影，字号 12px

## 数据

使用 `useStore` 中的 `dockApps` 数组作为数据源。
