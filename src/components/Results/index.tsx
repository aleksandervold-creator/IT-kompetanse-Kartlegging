'use client'

import { useRef } from 'react'
import { translations } from '@/i18n/translations'
import type { AnalysisResult, FormData, Language } from '@/lib/types'

interface ResultsProps {
  result: AnalysisResult
  formData: FormData
  language: Language
  onNewAnalysis: () => void
  onBackToForm: () => void
}

const ROLE_COLORS = [
  'bg-prima-50 border-prima-200 text-prima-800',
  'bg-blue-50 border-blue-200 text-blue-800',
  'bg-violet-50 border-violet-200 text-violet-800',
  'bg-amber-50 border-amber-200 text-amber-800',
  'bg-rose-50 border-rose-200 text-rose-800',
]

export default function Results({ result, formData, language, onNewAnalysis, onBackToForm }: ResultsProps) {
  const t = translations[language].results
  const containerRef = useRef<HTMLDivElement>(null)
  const today = new Date().toLocaleDateString(language === 'no' ? 'nb-NO' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex items-center justify-between no-print">
        <button onClick={onBackToForm} className="btn-secondary flex items-center gap-2 text-sm py-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.backToForm}
        </button>
        <div className="flex gap-2">
          <button onClick={handleDownloadPDF} className="btn-secondary flex items-center gap-2 text-sm py-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t.download}
          </button>
          <button onClick={onNewAnalysis} className="btn-primary text-sm py-2">
            {t.newAnalysis}
          </button>
        </div>
      </div>

      {/* Printable results content */}
      <div ref={containerRef} className="space-y-5">
        {/* Header */}
        <div className="card p-5 bg-gradient-to-br from-prima-500 to-prima-700 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{t.title}</h2>
              <p className="text-prima-100 text-sm mt-1">{t.date}: {today}</p>
            </div>
            <div className="text-right text-prima-100 text-sm">
              <p className="font-semibold text-white">Prima</p>
              <p>Arbeid og inkludering</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-prima-100 rounded-full flex items-center justify-center text-prima-600 text-xs font-bold">1</span>
            {t.summary}
          </h3>
          <p className="text-gray-700 leading-relaxed">{result.summary}</p>
        </div>

        {/* Skill translations */}
        {result.translations && result.translations.length > 0 && (
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">2</span>
              {t.translationsTitle}
            </h3>
            <div className="space-y-2">
              {result.translations.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-prima-400 mt-2" />
                  <div>
                    <span className="font-medium text-sm text-gray-800">{item.skill}</span>
                    <span className="text-gray-400 mx-2">→</span>
                    <span className="text-sm text-gray-600">{item.translation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roles */}
        {result.roles && result.roles.length > 0 && (
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-xs font-bold">3</span>
              {t.rolesTitle}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {result.roles.map((role, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 ${ROLE_COLORS[idx % ROLE_COLORS.length]}`}
                >
                  <p className="font-semibold text-sm mb-1">{role.title}</p>
                  <p className="text-xs leading-relaxed opacity-80">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {result.tips && result.tips.length > 0 && (
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs font-bold">4</span>
              {t.tipsTitle}
            </h3>
            <ol className="space-y-3">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-prima-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Footer for PDF */}
        <div className="text-center text-xs text-gray-400 py-2">
          Prima – Arbeid og inkludering · prima.no · IT-kompetansekartlegging
        </div>
      </div>
    </div>
  )
}
