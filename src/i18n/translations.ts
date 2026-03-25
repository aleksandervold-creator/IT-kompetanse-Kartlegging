export const translations = {
  no: {
    header: {
      title: 'IT-kompetansekartlegging',
      subtitle: 'Prima – Arbeid og inkludering',
      tagline: 'Kartlegg dine IT-ferdigheter og finn din vei inn i arbeidslivet',
    },
    mode: {
      label: 'Velg modus',
      deltaker: 'Deltaker',
      veileder: 'Veileder',
      deltakerDesc: 'Fyll ut skjemaet selv',
      veilederDesc: 'Fyll ut sammen med veileder',
    },
    form: {
      sectionTitle: 'Kompetanseområder',
      sectionDesc: 'Vurder dine ferdigheter innen hvert område på en skala fra 0 til 5.',
      levelLabels: ['Ingen erfaring', 'Grunnleggende', 'Litt kjennskap', 'Middels', 'Godt over middels', 'Ekspert'],
      levelShort: ['0', '1', '2', '3', '4', '5'],
      expand: 'Vis ferdigheter',
      collapse: 'Skjul ferdigheter',
      gaming: {
        description: 'Gaming gir ofte verdifull IT-kompetanse. Beskriv spillene du spiller og hva du gjør i dem — server-administrasjon, modding, strategi, osv.',
      },
      education: {
        label: 'Utdanning',
        placeholder: 'Beskriv din utdanningsbakgrunn, kurs og sertifiseringer...',
      },
      informalExperience: {
        label: 'Uformell erfaring',
        placeholder: 'Hjemmeprosjekter, frivillig arbeid, hobbyer med IT-relevans...',
      },
      additionalInfo: {
        label: 'Tilleggsinformasjon',
        placeholder: 'Andre ting du vil fortelle om din IT-bakgrunn...',
      },
      submit: 'Analyser kompetansen min',
      analyzing: 'Analyserer...',
      autoSaved: 'Lagret automatisk',
    },
    results: {
      title: 'Din kompetanseanalyse',
      date: 'Dato',
      summary: 'Oppsummering',
      translationsTitle: 'Dine ferdigheter på bransjespråk',
      rolesTitle: 'Relevante stillingstyper',
      tipsTitle: 'Tips for videre utvikling',
      download: 'Last ned som PDF',
      newAnalysis: 'Ny kartlegging',
      backToForm: 'Tilbake til skjema',
      level: 'Nivå',
    },
    errors: {
      analysisFailed: 'Analyse mislyktes. Sjekk at ANTHROPIC_API_KEY er satt og prøv igjen.',
    },
  },
  en: {
    header: {
      title: 'IT Competency Mapping',
      subtitle: 'Prima – Work and Inclusion',
      tagline: 'Map your IT skills and find your path into the workforce',
    },
    mode: {
      label: 'Select mode',
      deltaker: 'Participant',
      veileder: 'Counselor',
      deltakerDesc: 'Fill out the form yourself',
      veilederDesc: 'Fill out together with a counselor',
    },
    form: {
      sectionTitle: 'Competency Areas',
      sectionDesc: 'Rate your skills in each area on a scale from 0 to 5.',
      levelLabels: ['No experience', 'Basic', 'Some knowledge', 'Intermediate', 'Above average', 'Expert'],
      levelShort: ['0', '1', '2', '3', '4', '5'],
      expand: 'Show skills',
      collapse: 'Hide skills',
      gaming: {
        description: 'Gaming often provides valuable IT skills. Describe the games you play and what you do in them — server administration, modding, strategy, etc.',
      },
      education: {
        label: 'Education',
        placeholder: 'Describe your educational background, courses and certifications...',
      },
      informalExperience: {
        label: 'Informal Experience',
        placeholder: 'Home projects, volunteer work, hobbies with IT relevance...',
      },
      additionalInfo: {
        label: 'Additional Information',
        placeholder: 'Other things you want to share about your IT background...',
      },
      submit: 'Analyze My Competencies',
      analyzing: 'Analyzing...',
      autoSaved: 'Auto-saved',
    },
    results: {
      title: 'Your Competency Analysis',
      date: 'Date',
      summary: 'Summary',
      translationsTitle: 'Your Skills in Industry Language',
      rolesTitle: 'Relevant Job Types',
      tipsTitle: 'Tips for Further Development',
      download: 'Download as PDF',
      newAnalysis: 'New Mapping',
      backToForm: 'Back to Form',
      level: 'Level',
    },
    errors: {
      analysisFailed: 'Analysis failed. Check that ANTHROPIC_API_KEY is set and try again.',
    },
  },
} as const

export type TranslationKey = typeof translations
