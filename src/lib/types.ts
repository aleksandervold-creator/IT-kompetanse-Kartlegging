export type Language = 'no' | 'en'
export type Mode = 'deltaker' | 'veileder'
export type AppStep = 'form' | 'results'

export interface SkillItem {
  no: string
  en: string
}

export interface SkillAreaConfig {
  name: { no: string; en: string }
  items: SkillItem[]
}

export interface SkillsConfig {
  areas: Record<string, SkillAreaConfig>
  gaming: {
    name: { no: string; en: string }
    placeholder: { no: string; en: string }
  }
}

export interface SkillRatings {
  [key: string]: number // format: "{areaKey}.{index}" -> 0-5
}

export interface FormData {
  mode: Mode
  language: Language
  skills: SkillRatings
  gamingText: string
  education: string
  informalExperience: string
  additionalInfo: string
}

export interface AnalysisResult {
  translations: Array<{ skill: string; translation: string }>
  roles: Array<{ title: string; description: string }>
  summary: string
  tips: string[]
}
