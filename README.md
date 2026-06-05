# 🎓 研究生毕业流程指引

> 厦门大学信息学院研究生毕业论文送审、答辩及申请学位流程指引 — 交互式 Web 应用

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![UI](https://img.shields.io/badge/Ant_Design-5-1677ff?logo=antdesign)](https://ant.design/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)

---

## 📖 项目简介

将学院[原始毕业流程页面](https://informatics.xmu.edu.cn/info/2301/178021.htm)（一篇冗长的文字说明）改造为 **分阶段、可勾选、进度可视化** 的交互式指引系统。

### ✨ 核心特性

- 🎯 **身份选择** — 学术型硕士 / 专业型硕士 / 学术型博士 / 工程硕博（另行通知）
- 📋 **任务清单** — 每个阶段拆分具体任务，含材料清单、注意事项、相关链接
- ✅ **进度追踪** — 勾选完成任务，localStorage 持久化，刷新不丢失
- 📊 **进度可视化** — 整体完成度环 + 每阶段进度条
- ✍️ **论文撰写小贴士** — 倒推时间线、工作量参考、撰写建议
- 📱 **移动端友好** — 响应式布局，手机也能流畅使用

### 🖼️ 效果预览

> 启动项目后访问 `http://localhost:5173` 即可查看

| 首页 - 身份选择 | 流程指引页 |
|:---:|:---:|
| 选择学位类型，查看进度概览 | 左侧步骤导航 + 右侧任务卡片 |

| 任务详情卡片 | 论文撰写小贴士 |
|:---:|:---:|
| 材料清单、注意事项、链接、勾选 | 时间线、工作量参考、撰写建议 |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆项目
git clone git@github.com:BUG423/Graduation_Process_Guidelines.git
cd Graduation_Process_Guidelines

# 进入前端目录
cd client

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可使用。

### 构建部署

```bash
cd client
npm run build
# 产出在 client/dist/ 目录，可直接部署到任意静态服务器
```

---

## 📁 项目结构

```
Graduation_Process_Guidelines/
├── README.md                           # 本文件
├── DESIGN.md                           # 技术方案 & 设计文档
├── source_page_content.md              # 原始网页（结构化整理）
├── source_page_raw.html                # 原始网页（HTML 备份）
│
└── client/                             # 前端项目
    ├── index.html
    └── src/
        ├── main.tsx                    # 入口
        ├── App.tsx                     # 路由配置
        ├── index.css                   # 全局样式 + 动画
        │
        ├── data/                       # 数据层
        │   ├── degreeTypes.ts          # 学位类型定义（3+1种）
        │   ├── flowData.ts             # 各类型完整流程数据
        │   └── writingTips.ts          # 论文撰写小贴士
        │
        ├── components/                 # 组件
        │   ├── AppLayout.tsx           # 全局布局（顶栏+内容+底栏）
        │   └── TaskCard.tsx            # 任务卡片
        │
        ├── pages/                      # 页面
        │   ├── Dashboard.tsx           # 首页（身份选择）
        │   └── GuidePage.tsx           # 流程指引页
        │
        ├── store/
        │   └── progressStore.ts        # Zustand 状态管理
        │
        └── utils/
            └── storage.ts              # localStorage 工具
```

---

## 🗺️ 学位类型

| 类型 | 标识 | 说明 |
|------|------|------|
| 📚 学术型硕士 | `academic-master` | 计算机科学与技术、信息与通信工程等学术学位 |
| 💼 专业型硕士 | `professional-master` | 电子信息等专业学位，含企业专家评阅 |
| 🎓 学术型博士 | `academic-phd` | 含预答辩、质量核查、答辩海报等博士专属环节 |
| 🔧 工程硕博 | `engineering` | 卓越工程师计划等，由学院另行通知 |

---

## 🔧 技术栈

| 技术 | 用途 |
|------|------|
| [React 18](https://react.dev/) | UI 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Vite](https://vitejs.dev/) | 构建工具 |
| [Ant Design 5](https://ant.design/) | UI 组件库 |
| [React Router v6](https://reactrouter.com/) | 路由 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 状态管理 |
| localStorage | 进度持久化 |

---

## 📝 数据来源

- [信息学院研究生毕业论文送审、答辩及申请学位流程提示](https://informatics.xmu.edu.cn/info/2301/178021.htm)（2026年5月16日更新）
- [信息学院博士、硕士研究生申请学位发表科研成果规定](https://informatics.xmu.edu.cn/info/2301/178001.htm)
- 参考项目：[xmu-info-thesis-submission](https://qi-xmu.github.io/xmu-info-thesis-submission/) by qi-xmu

> ⚠️ 本系统仅供参考，所有流程要求以学院正式通知为准。

---

## 📄 License

MIT © 2026
