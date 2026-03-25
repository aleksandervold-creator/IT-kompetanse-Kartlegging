# IT-kompetansekartlegging – Prima

Next.js webapp for kartlegging av IT-kompetanse for jobbsøkere hos Prima (Kopano-kjeden).

## Hurtigstart

```bash
npm install
cp .env.example .env.local
# Sett ANTHROPIC_API_KEY i .env.local
npm run dev        # http://localhost:3000
```

## Prosjektstruktur

```
IT-kompetanse-Kartlegging/
├── config/
│   └── skills.json           # Alle kompetanseområder og ferdigheter (admin-konfig)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # HTML-rammeverk, metadata, DM Sans-font
│   │   ├── page.tsx           # Rotside (klientkomponent, håndterer state)
│   │   ├── globals.css        # Tailwind + egendefinerte CSS-klasser
│   │   └── api/
│   │       └── analyze/
│   │           └── route.ts   # POST /api/analyze — kaller Claude API
│   ├── components/
│   │   ├── Header.tsx          # Prima-header med logo og tagline
│   │   ├── LanguageToggle.tsx  # NO/EN veksler
│   │   ├── ModeSelector.tsx    # Deltaker/Veileder-valg
│   │   ├── SkillForm/
│   │   │   ├── index.tsx       # Hovedskjema, koordinerer alle seksjoner
│   │   │   ├── SkillArea.tsx   # Én akkordeon-seksjon med ferdigheter
│   │   │   ├── SkillSlider.tsx # Slider 0–5 for én ferdighet
│   │   │   └── GamingSection.tsx # Gaming-fritekstfelt
│   │   └── Results/
│   │       └── index.tsx       # Analyseresultater + PDF-eksport
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Autosave til localStorage
│   ├── lib/
│   │   └── types.ts            # TypeScript-typer
│   └── i18n/
│       └── translations.ts     # All UI-tekst på norsk og engelsk
```

## Miljøvariabler

| Variabel            | Påkrevd | Beskrivelse                          |
|---------------------|---------|--------------------------------------|
| `ANTHROPIC_API_KEY` | Ja      | API-nøkkel fra console.anthropic.com |

## Vanlige kommandoer

```bash
npm run dev     # Start utviklingsserver
npm run build   # Bygg for produksjon
npm run lint    # ESLint-sjekk
npm start       # Start produksjonsserver
```

## Legge til ferdigheter / kategorier

Rediger kun `config/skills.json` — ingen kodeendringer nødvendig. Strukturen:

```json
{
  "areas": {
    "minKategori": {
      "name": { "no": "Norsk navn", "en": "English name" },
      "items": [
        { "no": "Ferdighet NO", "en": "Skill EN" }
      ]
    }
  }
}
```

## Deploy til Vercel

1. Push til GitHub
2. Importer repo i Vercel
3. Legg til `ANTHROPIC_API_KEY` som Environment Variable
4. Deploy

## Teknisk stack

- **Next.js 14** med App Router
- **TypeScript** med strict mode
- **Tailwind CSS** med Prima-fargepalett (#1a9a8a)
- **DM Sans** font (Google Fonts)
- **@anthropic-ai/sdk** for Claude API-kall (server-side)
- **html2pdf.js** for PDF-eksport (client-side)
- **localStorage** for autosave av halvveis utfylling
