'use client'

import type { Language } from '@/lib/types'

interface LanguageToggleProps {
  language: Language
  onChange: (lang: Language) => void
}

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1" role="group" aria-label="Language / Språk">
      <button
        onClick={() => onChange('no')}
        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-150 ${
          language === 'no'
            ? 'bg-white text-prima-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-pressed={language === 'no'}
      >
        NO
      </button>
      <button
        onClick={() => onChange('en')}
        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-150 ${
          language === 'en'
            ? 'bg-white text-prima-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  )
}
