"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, User, Settings, LogOut, Search } from "lucide-react"

interface SearchResult {
  id: number
  type: string
  text: string
  arabicText?: string
  source: string
  topic: string
  relevanceScore: number
}

export default function ResultsPage() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedResults = sessionStorage.getItem("searchResults")
    const storedQuery = sessionStorage.getItem("searchQuery")

    if (storedResults) {
      const parsed = JSON.parse(storedResults)
      setResults(parsed.results || [])
      setQuery(parsed.query || "")
    } else {
      // if no results in storage, redirect back
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-serif font-bold">Islamic AI Agent</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><User className="h-4 w-4 mr-2" />Profile</Button>
              <Button variant="ghost" size="sm"><Settings className="h-4 w-4 mr-2" />Settings</Button>
              <Button variant="ghost" size="sm"><LogOut className="h-4 w-4 mr-2" />Sign Out</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Results for: <span className="text-primary">"{query}"</span>
        </h1>

        {results.length === 0 ? (
          <p className="text-muted-foreground">No results found.</p>
        ) : (
          <div className="space-y-4">
            {results.map((res) => (
              <Card key={res.id} className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-serif">{res.topic} ({res.type})</CardTitle>
                </CardHeader>
                <CardContent>
                  {res.arabicText && (
                    <p className="text-lg font-arabic text-right mb-2">{res.arabicText}</p>
                  )}
                  <p className="mb-2">{res.text}</p>
                  <p className="text-sm text-muted-foreground">Source: {res.source}</p>
                  <p className="text-xs text-muted-foreground">Relevance: {res.relevanceScore}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
