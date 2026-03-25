import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import skillsConfig from '../../../../config/skills.json'
import type { SkillsConfig } from '@/lib/types'

const config = skillsConfig as SkillsConfig

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 }
    )
  }

  const client = new Anthropic({ apiKey })

  try {
    const body = await request.json()
    const { skills, gamingText, education, informalExperience, additionalInfo, language } = body

    // Build a readable skills list from ratings
    const skillLines: string[] = []
    for (const [areaKey, area] of Object.entries(config.areas)) {
      const areaItems = area.items
        .map((item, idx) => {
          const rating = (skills as Record<string, number>)[`${areaKey}.${idx}`] ?? 0
          return rating > 0 ? `  - ${item.en}: ${rating}/5` : null
        })
        .filter(Boolean)

      if (areaItems.length > 0) {
        skillLines.push(`${area.name.en}:\n${areaItems.join('\n')}`)
      }
    }

    const skillsText = skillLines.length > 0
      ? skillLines.join('\n\n')
      : 'No skills rated above 0'

    const responseLanguage = language === 'no'
      ? 'Norwegian Bokmål (norsk bokmål)'
      : 'English'

    const prompt = `You are a supportive IT career advisor at Prima, a Norwegian work and inclusion company that helps job seekers enter the workforce. Your role is to analyze a participant's IT competencies and provide encouraging, actionable career guidance.

## Participant's IT Skills (rated 0-5)
${skillsText}

## Gaming / Hobby Activities
${gamingText || 'Not provided'}

## Education
${education || 'Not provided'}

## Informal Experience
${informalExperience || 'Not provided'}

## Additional Information
${additionalInfo || 'Not provided'}

## Task
Analyze these competencies and respond in **${responseLanguage}** with ONLY a valid JSON object in this exact format:

{
  "translations": [
    {
      "skill": "the skill name as given",
      "translation": "professional industry term and brief explanation of its relevance"
    }
  ],
  "roles": [
    {
      "title": "Job Title",
      "description": "1-2 sentences explaining why this role matches the candidate's profile"
    }
  ],
  "summary": "2-3 encouraging sentences summarizing the candidate's strengths and potential",
  "tips": [
    "Concrete, actionable development tip",
    "Another specific tip",
    "Another specific tip",
    "Another specific tip",
    "Another specific tip"
  ]
}

Guidelines:
- Include 5-10 most significant skill translations (focus on non-obvious ones that benefit from translation to industry terms)
- Suggest 3-5 realistic job roles matching the skill level shown
- The summary should be warm, encouraging, and highlight genuine strengths
- Tips should be specific, actionable, and achievable (not vague)
- If gaming is mentioned, actively translate it to professional skills (e.g., Minecraft → spatial reasoning, logistics, redstone → basic programming logic)
- Return ONLY the JSON object, no markdown, no explanation`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API')
    }

    const jsonText = content.text.trim()
    const result = JSON.parse(jsonText)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to analyze competencies: ${message}` },
      { status: 500 }
    )
  }
}
