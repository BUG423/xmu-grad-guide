# 🎓 XMU Grad Guide

[![GitHub Pages](https://github.com/BUG423/xmu-grad-guide/actions/workflows/pages.yml/badge.svg)](https://github.com/BUG423/xmu-grad-guide/actions/workflows/pages.yml)
[![Online Platform](https://img.shields.io/badge/Web-在线毕业指引-blue.svg)](https://bug423.github.io/xmu-grad-guide/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%2F6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-6.x-0170FE?logo=antdesign&logoColor=white)](https://ant.design/)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-red.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

> **XMU Grad Guide**（厦门大学研究生毕业指引）是一个基于 React 19 + TypeScript + Vite 构建的现代化交互式毕业流程管理与任务追踪 Web 应用，专为厦门大学信息学院研究生量身打造，将冗长繁复的毕业须知转化为可视化、分阶段、可追踪的清晰指引。

---

## 🌐 在线体验

应用已完成 GitHub Pages 云端自动化托管与持续集成，开箱即用：

👉 **[点击直接进入 XMU Grad Guide 厦大研究生毕业指引](https://bug423.github.io/xmu-grad-guide/)**

---

## ✨ 核心能力与特色亮点

- 🎓 **多学位类型精准适配**：支持学术型硕士、专业型硕士、学术型博士三种主要学位流程，并提供工程硕博专项指引提示，精准匹配各学位的差异化考核与材料要求。
- 📋 **三大阶段全流程覆盖**：细致拆解「定稿送审」、「答辩考核」、「答辩后材料提交」全生命周期任务，包含图像采集、科研成果审核、预答辩、论文盲审、答辩决议等数十项核心节点。
- ✅ **交互式任务清单与材料提示**：每个任务均提供详尽说明、所需材料清单、格式规范、注意事项与官方系统直达链接，彻底告别材料遗漏与反复跑腿。
- 📊 **可视化进度看板与本地持久化**：基于 Zustand 状态管理与 LocalStorage 本地存储，勾选进度实时计算百分比与状态标签，无需登录账号，数据完全保留在用户本地，充分保障学生隐私安全。
- 💡 **论文撰写时间线与避坑贴士**：内置以送审为目标的倒推时间线规划表、各学位工作量建议与论文撰写实战贴士，助力高效备考毕业。
- 📱 **响应式界面与移动端优先体验**：基于 Ant Design 深度适配，兼顾桌面端宽屏多栏与手机端触屏浏览，随时随地查阅流程。

---

## 🛠️ 本地运行指南

### 环境准备

- Node.js >= 18.0.0
- npm >= 9.0.0

### 开发与构建

```bash
# 1. 安装项目依赖
npm ci

# 2. 启动本地开发服务器（支持 HMR 热更新）
npm run dev

# 3. 执行 ESLint 代码规范检查
npm run lint

# 4. 执行 TypeScript 类型检查并构建生产产物
npm run build

# 5. 本地预览生产构建产物
npm run preview
```

生产构建产物将输出至 `dist/` 目录，静态资源路径已预设适配 `/xmu-grad-guide/` 基础路径。

---

## 📄 知识产权与开源协议

本项目遵循 **[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/)** 严格非商业开源许可：

- ❌ **严禁商用**：任何个人或组织不得将本项目源码、编译产物或衍生版本用于任何商业盈利目的。
- ❌ **禁止演绎与分发修改版**：未经授权不得散布基于本项目修改后的二次分发版本。
- 🔒 **权利保留**：作者保留对本平台代码与架构的所有版权与法律追责权利。
