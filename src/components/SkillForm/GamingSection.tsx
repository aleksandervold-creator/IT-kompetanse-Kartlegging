'use client'

import { translations } from '@/i18n/translations'
import type { Language } from '@/lib/types'
import skillsConfig from '../../../config/skills.json'

interface GamingSectionProps {
  value: string
  onChange: (value: string) => void
  language: Language
}

export default function GamingSection({ value, onChange, language }: GamingSectionProps) {
  const t = translations[language].form.gaming
  const gamingConfig = skillsConfig.gaming
  const title = gamingConfig.name[language]
  const placeholder = gamingConfig.placeholder[language]

  return (
    <div className="card p-4 sm:p-5 border-l-4 border-l-prima-400">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 bg-prima-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-prima-600" aria-hidden="true">
            <path d="M6 11h2v-2h2v2h2v2H10v2H8v-2H6v-2zm10-1a1 1 0 110 2 1 1 0 010-2zm-2 2a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
            <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{t.description}</p>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-prima-400 focus:border-transparent transition-colors placeholder:text-gray-400"
      />
    </div>
  )
}
