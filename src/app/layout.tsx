import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IT-kompetansekartlegging | Prima',
  description: 'Kartlegg dine IT-ferdigheter og få en personlig analyse med Prima – Arbeid og inkludering.',
  keywords: ['IT-kompetanse', 'kartlegging', 'Prima', 'jobbsøker', 'IT-ferdigheter'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
