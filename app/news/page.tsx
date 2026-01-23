'use client'

import Link from 'next/link'
import { useState } from 'react'
import { newsItems } from '@/lib/newsData'

export default function News() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // URLを検出してリンクに変換する関数
  const renderContentWithLinks = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = content.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gappy-green underline hover:text-opacity-80"
          >
            {part}
          </Link>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">News</h1>
          <p className="text-xl text-gray-600">最新情報・プレスリリース</p>
        </div>
      </section>

      {/* News List Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div 
                  className="flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-sm text-gray-500">{item.date}</p>
                      <span className="inline-block px-3 py-1 bg-gappy-green/10 text-gappy-green text-xs font-semibold rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-lg text-gappy-dark font-medium">{item.title}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <span className="text-gappy-green text-sm font-semibold">
                      {expandedIndex === index ? '閉じる ↑' : '詳しく見る →'}
                    </span>
                  </div>
                </div>
                
                {expandedIndex === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {renderContentWithLinks(item.content)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PR TIMES Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gappy-dark mb-4">プレスリリース一覧</h2>
          <p className="text-lg text-gray-600 mb-8">
            最新のプレスリリースはPR TIMESでもご覧いただけます。
          </p>
          <Link
            href="https://prtimes.jp/main/html/searchrlp/company_id/173634"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white border-2 border-gappy-green text-gappy-green px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gappy-green hover:text-gappy-dark transition-all shadow-lg hover:shadow-xl"
          >
            PR TIMESで見る →
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gappy-dark mb-4">メディア・取材のお問い合わせ</h2>
          <p className="text-lg text-gray-600 mb-8">
            プレスリリース配信のご希望や、取材のご依頼は
            <br className="hidden md:block" />
            お問い合わせフォームよりご連絡ください。
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  )
}
