# Unified Labs 新闻管理系统

基于 **Next.js 14** + **Supabase** + **Tailwind CSS** 构建的全栈新闻管理系统。

## 功能特性

- 📰 前台新闻展示（首页、新闻列表、新闻详情）
- 🔐 管理员登录认证
- ✏️ 后台新闻管理（发布、编辑、删除）
- 📝 草稿/发布状态切换
- 📱 响应式设计

## 快速开始

### 1. 设置 Supabase

1. 前往 [Supabase](https://supabase.com) 创建一个新项目
2. 在 **SQL Editor** 中运行 `supabase/schema.sql` 的内容
3. 在 **Authentication > Users** 中创建一个管理员用户

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> 这些值可以在 Supabase Dashboard > Settings > API 中找到

### 3. 安装依赖并运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000 查看前台
访问 http://localhost:3000/admin 进入后台

## 部署到 Vercel

### 方法一：通过 Vercel 控制台

1. 将代码推送到 GitHub
2. 前往 [Vercel](https://vercel.com) 并导入项目
3. 在 **Environment Variables** 中添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 点击 Deploy

### 方法二：通过 Vercel CLI

```bash
npm i -g vercel
vercel
```

## 项目结构

```
├── app/
│   ├── page.tsx              # 首页
│   ├── news/
│   │   ├── page.tsx          # 新闻列表
│   │   └── [slug]/page.tsx   # 新闻详情
│   └── admin/
│       ├── page.tsx          # 管理后台首页
│       ├── login/page.tsx    # 登录页
│       └── news/
│           ├── page.tsx      # 新闻管理
│           ├── new/page.tsx  # 发布新闻
│           └── edit/[id]/    # 编辑新闻
├── components/               # 公共组件
├── lib/
│   └── supabase.ts          # Supabase 客户端
└── supabase/
    └── schema.sql           # 数据库结构
```

## 技术栈

- **框架**: Next.js 14 (App Router)
- **数据库**: Supabase (PostgreSQL)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **部署**: Vercel

## 许可

MIT
