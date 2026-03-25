'use client'

import { useEffect, useRef, useState } from 'react'
import SkillArea from './SkillArea'
import GamingSection from './GamingSection'
import { translations } from '@/i18n/translations'
import type { FormData, Language, SkillsConfig } from '@/lib/types'
import skillsJson from '../../../config/skills.json'

const skillsConfig = skillsJson as SkillsConfig

interface SkillFormProps {
  formData: FormData
  onChange: (updates: Partial<FormData>) => void
  onSubmit: () => void
  isAnalyzing: boolean
  autoSaved: boolean
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-prima-400 focus:border-transparent placeholder:text-gray-400"
      />
    </div>
  )
}

export default function SkillForm({ formData, onChange, onSubmit, isAnalyzing, autoSaved }: SkillFormProps) {
  const t = translations[formData.language].form
  const language: Language = formData.language
  const submitRef = useRef<HTMLButtonElement>(null)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (autoSaved) {
      setShowSaved(true)
      const timer = setTimeout(() => setShowSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [autoSaved])

  const handleSkillChange = (key: string, value: number) => {
    onChange({ skills: { ...formData.skills, [key]: value } })
  }

  const areaKeys = Object.keys(skillsConfig.areas)

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">{t.sectionTitle}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t.sectionDesc}</p>
      </div>

      {/* Skill areas */}
      <div className="space-y-2">
        {areaKeys.map((areaKey, idx) => (
          <SkillArea
            key={areaKey}
            areaKey={areaKey}
            area={skillsConfig.areas[areaKey]}
            ratings={formData.skills}
            onChange={handleSkillChange}
            language={language}
            defaultOpen={idx === 0}
          />
        ))}
      </div>

      {/* Gaming section */}
      <GamingSection
        value={formData.gamingText}
        onChange={(v) => onChange({ gamingText: v })}
        language={language}
      />

      {/* Free text fields */}
      <div className="card p-4 sm:p-5 space-y-4">
        <TextAreaField
          label={t.education.label}
          value={formData.education}
          onChange={(v) => onChange({ education: v })}
          placeholder={t.education.placeholder}
        />
        <TextAreaField
          label={t.informalExperience.label}
          value={formData.informalExperience}
          onChange={(v) => onChange({ informalExperience: v })}
          placeholder={t.informalExperience.placeholder}
        />
        <TextAreaField
          label={t.additionalInfo.label}
          value={formData.additionalInfo}
          onChange={(v) => onChange({ additionalInfo: v })}
          placeholder={t.additionalInfo.placeholder}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2 h-6">
          {showSaved && (
            <span className="text-xs text-prima-600 flex items-center gap-1 animate-pulse">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.autoSaved}
            </span>
          )}
        </div>
        <button
          ref={submitRef}
          onClick={onSubmit}
          disabled={isAnalyzing}
          className="btn-primary flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t.analyzing}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t.submit}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
