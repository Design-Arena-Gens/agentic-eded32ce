import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Photo Caption & Email Agent',
  description: 'AI-powered photo captioning and email service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
