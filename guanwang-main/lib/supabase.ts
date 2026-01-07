import { createClient } from '@supabase/supabase-js'

// 这些值需要从 Supabase 项目设置中获取
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 文章类型
export type PostType = 'news' | 'insight'

// 数据库类型定义
export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  cover_image: string | null
  category: string
  post_type: PostType
  author: string | null
  read_time: number | null
  is_published: boolean
  created_at: string
  updated_at: string
}

// 向后兼容的别名
export type News = Post
