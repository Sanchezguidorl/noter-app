import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthUserProvider from '@/contexts/AuthUserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noter',
  description: 'Tu aplicación web de notas favorita',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthUserProvider>
        {children}
        </AuthUserProvider>
        </body>
    </html>
  )
}
