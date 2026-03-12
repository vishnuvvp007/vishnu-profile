import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vishnu VP — Python & Backend Engineer',
  description: 'Senior Python Developer | 8.9 Years | Django, FastAPI, Golang, AI/ML, Microservices',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
