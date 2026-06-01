# mac-os

![mac-os 项目预览](./readme.png)

一个基于 React、TypeScript 和 Vite 构建的 macOS 风格桌面模拟界面。项目复刻了桌面、菜单栏、Dock、Launchpad 以及多个常见应用窗口，用于展示 Web 端仿 macOS 交互与界面效果。

## 功能亮点

- macOS 风格桌面、壁纸、顶部菜单栏和 Dock
- Launchpad 应用启动器
- 多窗口应用界面与桌面交互
- 响应式布局，适配不同屏幕尺寸
- 使用 React 组件化组织界面

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Lucide React

## 本地运行

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 项目结构

```text
src/
  components/    # 桌面、Dock、菜单栏、应用窗口等组件
  store/         # 状态管理
  types/         # TypeScript 类型定义
public/
  images/        # 应用图标与界面资源
```
