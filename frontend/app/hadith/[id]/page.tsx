"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Star,
  ChevronRight,
  Bookmark,
  Share2,
  ArrowLeft,
  Shield,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface ContentDetail {
  content: any
  narratorInfo: any
  sanadDetails: any[]
  relatedContent: any[]
}

export default function HadithDetailPage({ params }: { params: { id: string } }) {
  const [contentDetail, setContentDetail] = useState<ContentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContentDetail = async () => {
      try {
        const response = await fetch(`/api/hadith/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch content details")
        }

        const data = await response.json()
        setContentDetail(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContentDetail()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading content details...</p>
        </div>
      </div>
    )
  }

  if (error || !contentDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-serif font-bold">Content Not Found</h1>
          <p className="text-muted-foreground">{error || "The requested content could not be found."}</p>
          <Link href="/search">
            <Button className="bg-primary hover:bg-primary/90">Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { content, narratorInfo, sanadDetails, relatedContent } = contentDetail

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
              <Link href="/results">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/search" className="hover:text-primary">
            Search
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/results" className="hover:text-primary">
            Results
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{content.type === "hadith" ? "Hadith" : "Quran"} Details</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Content Header */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={content.type === "hadith" ? "default" : "secondary"}>
                    {content.type === "hadith" ? "Hadith" : "Quran"}
                  </Badge>
                  {content.type === "hadith" && content.grade && (
                    <Badge className="bg-green-100 text-green-800">{content.grade}</Badge>
                  )}
                  {content.hadithNumber && <Badge variant="outline">#{content.hadithNumber}</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Arabic Text */}
              <div className="arabic-text text-primary text-2xl leading-relaxed p-6 bg-muted/30 rounded-lg text-center">
                {content.arabicText}
              </div>

              {/* English Translation */}
              <div className="text-center">
                <p className="text-foreground leading-relaxed text-lg font-medium">"{content.text}"</p>
              </div>

              {/* Source Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/50">
                <div className="space-y-3">
                  <h3 className="font-serif font-semibold text-lg">Source Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Collection:</span>
                      <span className="text-sm">{content.source}</span>
                    </div>
                    {content.book && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Book:</span>
                        <span className="text-sm">{content.book}</span>
                      </div>
                    )}
                    {content.surah && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Surah:</span>
                        <span className="text-sm">{content.surah}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif font-semibold text-lg">Classification</h3>
                  <div className="space-y-2">
                    {content.grade && (
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Grade:</span>
                        <Badge className="bg-green-100 text-green-800">{content.grade}</Badge>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Topic:</span>
                      <span className="text-sm">
                        {Array.isArray(content.topic) ? content.topic.join(", ") : content.topic}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sanad (Chain of Narrators) - Only for Hadith */}
          {content.type === "hadith" && sanadDetails && sanadDetails.length > 0 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Sanad (Chain of Narrators)
                </CardTitle>
                <CardDescription>
                  The complete chain of transmission from the Prophet (ﷺ) to the compiler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sanadDetails.map((narrator, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                            {narrator.position}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">{narrator.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {narrator.reliability}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      {index < sanadDetails.length - 1 && (
                        <div className="ml-4 mt-2 mb-2">
                          <div className="w-px h-6 bg-border"></div>
                          <div className="text-xs text-muted-foreground ml-2">↓ narrated to</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Commentary */}
          {content.commentary && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Scholarly Commentary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{content.commentary}</p>
              </CardContent>
            </Card>
          )}

          {/* Related Content */}
          {relatedContent && relatedContent.length > 0 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Related Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedContent.slice(0, 3).map((related, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={related.type === "hadith" ? "default" : "secondary"}>
                          {related.type === "hadith" ? "Hadith" : "Quran"}
                        </Badge>
                        <span className="text-sm font-medium">{related.source}</span>
                      </div>
                      <p className="text-sm text-foreground">"{related.text.substring(0, 150)}..."</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
