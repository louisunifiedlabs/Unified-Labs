'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  company: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setMessages(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)

    if (!error) {
      setMessages(messages.map(m =>
        m.id === id ? { ...m, is_read: true } : m
      ))
    }
  }

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      await markAsRead(message.id)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条消息吗？')) return

    setDeleting(id)
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
    setDeleting(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">联系消息</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount} 条未读消息
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">加载中...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>暂无联系消息</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleSelectMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                  } ${!message.is_read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.is_read ? 'bg-gray-100' : 'bg-blue-100'
                      }`}>
                        {message.is_read ? (
                          <MailOpen className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Mail className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium truncate ${!message.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.name}
                          </span>
                          {!message.is_read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(message.created_at)}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(message.id)
                      }}
                      disabled={deleting === message.id}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {selectedMessage ? (
            <div className="p-6">
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>
                    <strong>发件人:</strong> {selectedMessage.name}
                  </span>
                  <span>
                    <strong>邮箱:</strong>{' '}
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </span>
                  {selectedMessage.company && (
                    <span>
                      <strong>公司:</strong> {selectedMessage.company}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(selectedMessage.created_at)}
                </p>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  回复邮件
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[400px]">
              <Mail className="w-16 h-16 text-gray-200 mb-4" />
              <p>选择一条消息查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
