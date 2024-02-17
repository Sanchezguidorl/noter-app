import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavComponent from '@/components/layouts/NavComponent'
import NavCompact from '@/components/layouts/NavCompact'
import GetNotesProvider from '@/contexts/GetNotesProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noter',
  description: 'Tu aplicación web de notas favorita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col sm:flex-row h-full">
      <GetNotesProvider>
      <NavCompact />
      <NavComponent />
        {children}
        </GetNotesProvider>
        </div>
        </body>
    </html>
  )
}
