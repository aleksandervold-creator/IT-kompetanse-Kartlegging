'use client'

import { useState } from 'react'
import SkillSlider from './SkillSlider'
import type { SkillAreaConfig, SkillRatings, Language } from '@/lib/types'
import { translations } from '@/i18n/translations'

interface SkillAreaProps {
  areaKey: string
  area: SkillAreaConfig
  ratings: SkillRatings
  onChange: (key: string, value: number) => void
  language: Language
  defaultOpen?: boolean
}

export default function SkillArea({ areaKey, area, ratings, onChange, language, defaultOpen = false }: SkillAreaProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const t = translations[language].form

  const areaName = area.name[language]

  // Count rated skills for badge
  const ratedCount = area.items.filter((_, idx) => (ratings[`${areaKey}.${idx}`] ?? 0) > 0).length
  const avgRating = ratedCount > 0
    ? (area.items.reduce((sum, _, idx) => sum + (ratings[`${areaKey}.${idx}`] ?? 0), 0) / area.items.length).toFixed(1)
    : null

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-gray-50 transition-colors duration-150 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">{areaName}</span>
          {ratedCount > 0 && (
            <span className="inline-flex items-center gap-1 bg-prima-50 text-prima-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {ratedCount}/{area.items.length}
              {avgRating && (
                <span className="text-prima-500">· ⌀{avgRating}</span>
              )}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">
            {isOpen ? t.collapse : t.expand}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-50 space-y-5">
          {area.items.map((item, idx) => (
            <SkillSlider
              key={idx}
              skillKey={`${areaKey}.${idx}`}
              label={item[language]}
              value={ratings[`${areaKey}.${idx}`] ?? 0}
              onChange={onChange}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  )
}
