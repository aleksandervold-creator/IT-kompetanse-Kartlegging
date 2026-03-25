'use client'

import { translations } from '@/i18n/translations'
import type { Language, Mode } from '@/lib/types'

interface ModeSelectorProps {
  mode: Mode
  language: Language
  onChange: (mode: Mode) => void
}

export default function ModeSelector({ mode, language, onChange }: ModeSelectorProps) {
  const t = translations[language].mode

  return (
    <div>
      <p className="text-sm font-medium text-gray-600 mb-2">{t.label}</p>
      <div className="grid grid-cols-2 gap-3">
        {(['deltaker', 'veileder'] as Mode[]).map((m) => {
          const isSelected = mode === m
          const label = t[m]
          const desc = t[`${m}Desc` as 'deltakerDesc' | 'veilederDesc']

          return (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                isSelected
                  ? 'border-prima-500 bg-prima-50 text-prima-800'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-prima-500 bg-prima-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-semibold text-sm">{label}</span>
              </div>
              <p className="text-xs text-gray-500 ml-6">{desc}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
