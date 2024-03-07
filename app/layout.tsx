import AuthUserProvider from "@/contexts/AuthUserProvider";
import "./globals.css";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import GetNotebooksProvider from "@/contexts/GetNotebooksProvider";
import { Metadata } from "next";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noter',
  description: 'Tu app de notas gratuita favorita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}> 
        <AuthUserProvider>
          <GetNotebooksProvider>
            <GetNotesProvider>
                {children}
            </GetNotesProvider>
          </GetNotebooksProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
