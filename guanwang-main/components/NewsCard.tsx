import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { News } from '@/lib/supabase'

interface NewsCardProps {
  news: News
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/news/${news.slug}`}>
      <article className="group relative border border-white/10 bg-black/40 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden">
        {news.cover_image && (
          <div className="relative h-48 overflow-hidden border-b border-white/10">
            <Image
              src={news.cover_image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(news.created_at)}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 border border-white/20 rounded">
              {news.category}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
            {news.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
            {news.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest font-medium">
            Read More
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}
