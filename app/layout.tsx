import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavComponent from '@/components/layouts/NavComponent'
import NavCompact from '@/components/layouts/NavCompact'

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
      <NavCompact />
      <NavComponent />
        {children}
        </div>
        </body>
    </html>
  )
}
