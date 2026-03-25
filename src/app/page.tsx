'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import LanguageToggle from '@/components/LanguageToggle'
import ModeSelector from '@/components/ModeSelector'
import SkillForm from '@/components/SkillForm'
import Results from '@/components/Results'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { translations } from '@/i18n/translations'
import type { AnalysisResult, AppStep, FormData, Language } from '@/lib/types'

const DEFAULT_FORM_DATA: FormData = {
  mode: 'deltaker',
  language: 'no',
  skills: {},
  gamingText: '',
  education: '',
  informalExperience: '',
  additionalInfo: '',
}

export default function Page() {
  const [savedForm, setSavedForm, clearSavedForm, isLoaded] = useLocalStorage<FormData>(
    'prima-it-form',
    DEFAULT_FORM_DATA
  )
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA)
  const [step, setStep] = useState<AppStep>('form')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoSaved, setAutoSaved] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const language: Language = formData.language

  // Load persisted form once localStorage is ready
  useEffect(() => {
    if (isLoaded) {
      setFormData(savedForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  const handleFormChange = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates }
      // Debounced autosave
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        setSavedForm(next)
        setAutoSaved(true)
      }, 800)
      return next
    })
  }, [setSavedForm])

  const handleLanguageChange = (lang: Language) => {
    handleFormChange({ language: lang })
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: formData.skills,
          gamingText: formData.gamingText,
          education: formData.education,
          informalExperience: formData.informalExperience,
          additionalInfo: formData.additionalInfo,
          language: formData.language,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Unknown error')
      }

      const data: AnalysisResult = await response.json()
      setResult(data)
      setStep('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    clearSavedForm()
    setFormData(DEFAULT_FORM_DATA)
    setResult(null)
    setStep('form')
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToForm = () => {
    setStep('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} />

      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {/* Top bar: mode + language */}
        <div className="card p-4 sm:p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {step === 'form' ? t.mode.label : t.results.title}
            </span>
            <LanguageToggle language={language} onChange={handleLanguageChange} />
          </div>
          {step === 'form' && (
            <ModeSelector
              mode={formData.mode}
              language={language}
              onChange={(mode) => handleFormChange({ mode })}
            />
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Main content */}
        {step === 'form' && (
          <SkillForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleAnalyze}
            isAnalyzing={isAnalyzing}
            autoSaved={autoSaved}
          />
        )}

        {step === 'results' && result && (
          <Results
            result={result}
            formData={formData}
            language={language}
            onNewAnalysis={handleNewAnalysis}
            onBackToForm={handleBackToForm}
          />
        )}
      </main>
    </div>
  )
}
