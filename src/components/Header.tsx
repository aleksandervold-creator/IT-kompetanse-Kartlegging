'use client'

import { translations } from '@/i18n/translations'
import type { Language } from '@/lib/types'

interface HeaderProps {
  language: Language
}

export default function Header({ language }: HeaderProps) {
  const t = translations[language].header

  return (
    <header className="bg-prima-500 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-1">
          {/* Prima logo mark */}
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" aria-hidden="true">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{t.title}</h1>
            <p className="text-prima-100 text-sm font-medium">{t.subtitle}</p>
          </div>
        </div>
        <p className="text-prima-100 text-sm mt-3 ml-12">{t.tagline}</p>
      </div>
    </header>
  )
}
