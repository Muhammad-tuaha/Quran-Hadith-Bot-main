import type { Metadata } from "next"
import type React from "react"
import { Work_Sans, Open_Sans, Scheherazade_New } from "next/font/google"

import AuthProvider from "./providers/AuthProviders"
import "./globals.css"

// ✅ Fonts
const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-arabic",
})

// ✅ Metadata
export const metadata: Metadata = {
  title: "Islamic AI Agent - Hadith & Quran Search",
  description: "AI-powered Islamic knowledge search with authentic Hadith and Quran verses",
  generator: "v0.app",
}

// ✅ Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${openSans.variable} ${scheherazade.variable}`}
    >
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
