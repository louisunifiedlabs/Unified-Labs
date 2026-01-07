'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, Post } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Newspaper, Lightbulb } from 'lucide-react'

export default function PostsManagePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'news' | 'insight'>('all')

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('post_type', filter)
    }

    const { data, error } = await query

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchPosts()
  }, [filter])

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('posts')
      .update({ is_published: !currentStatus })
      .eq('id', id)

    if (!error) {
      setPosts(posts.map(p =>
        p.id === id ? { ...p, is_published: !currentStatus } : p
      ))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return

    setDeleting(id)
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (!error) {
      setPosts(posts.filter(p => p.id !== id))
    }
    setDeleting(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getTypeLabel = (type: string) => {
    return type === 'news' ? '新闻' : '洞察'
  }

  const getTypeColor = (type: string) => {
    return type === 'news'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-purple-100 text-purple-700'
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/posts/new?type=news"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Newspaper className="w-4 h-4" />
            发布新闻
          </Link>
          <Link
            href="/admin/posts/new?type=insight"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            发布洞察
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('news')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'news'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          新闻
        </button>
        <button
          onClick={() => setFilter('insight')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'insight'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          洞察
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            暂无内容，点击上方按钮发布第一篇文章
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">标题</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">类型</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">分类</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">日期</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1 max-w-xs">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.post_type)}`}>
                      {item.post_type === 'news' ? <Newspaper className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                      {getTypeLabel(item.post_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      item.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.is_published ? (
                        <><Eye className="w-3 h-3" /> 已发布</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> 草稿</>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(item.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublish(item.id, item.is_published)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title={item.is_published ? '下架' : '上架'}
                      >
                        {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link
                        href={`/admin/posts/edit/${item.id}`}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleting === item.id}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
