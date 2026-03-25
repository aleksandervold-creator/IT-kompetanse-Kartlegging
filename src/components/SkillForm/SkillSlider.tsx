'use client'

import { translations } from '@/i18n/translations'
import type { Language } from '@/lib/types'

interface SkillSliderProps {
  skillKey: string
  label: string
  value: number
  onChange: (key: string, value: number) => void
  language: Language
}

const LEVEL_COLORS = [
  'text-gray-400',
  'text-blue-500',
  'text-cyan-500',
  'text-teal-500',
  'text-prima-500',
  'text-prima-700',
]

export default function SkillSlider({ skillKey, label, value, onChange, language }: SkillSliderProps) {
  const t = translations[language].form
  const levelLabel = t.levelLabels[value]
  const pct = (value / 5) * 100

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={skillKey} className="text-sm text-gray-700 font-medium leading-snug">
          {label}
        </label>
        <span
          className={`text-xs font-semibold min-w-[90px] text-right ${LEVEL_COLORS[value]}`}
          aria-live="polite"
        >
          {value > 0 ? `${value}/5 – ${levelLabel}` : levelLabel}
        </span>
      </div>
      <input
        id={skillKey}
        type="range"
        min={0}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(skillKey, parseInt(e.target.value))}
        className="prima-slider w-full"
        style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={value}
        aria-valuetext={levelLabel}
      />
      <div className="flex justify-between mt-1">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`text-[10px] ${n === value ? 'text-prima-600 font-bold' : 'text-gray-300'}`}>
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
