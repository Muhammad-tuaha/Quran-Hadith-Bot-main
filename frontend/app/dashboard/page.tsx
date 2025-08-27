"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, User, Settings, LogOut, Clock, Bookmark, TrendingUp, Calendar } from "lucide-react"

const recentSearches = [
  { query: "Prayer times", timestamp: "2 hours ago", results: 45 },
  { query: "Charity in Islam", timestamp: "1 day ago", results: 128 },
  { query: "Patience in hardship", timestamp: "3 days ago", results: 67 },
]

const savedHadith = [
  {
    id: 1,
    text: "The believer is not one who eats his fill while his neighbor goes hungry.",
    source: "Sahih al-Bukhari",
    grade: "Sahih",
    savedAt: "2 days ago",
  },
  {
    id: 2,
    text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    source: "Sahih Muslim",
    grade: "Sahih",
    savedAt: "1 week ago",
  },
]

export default function DashboardPage() {
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
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, Scholar</h1>
              <p className="text-muted-foreground mt-2">Continue your journey of Islamic knowledge</p>
              <div className="arabic-text text-primary text-lg mt-2">وَقُل رَّبِّ زِدْنِي عِلْمًا</div>
            </div>
            <Link href="/chat">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Start Conversation
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Quick Actions</CardTitle>
                <CardDescription>Access your most used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/chat">
                    <Button variant="outline" className="h-20 flex-col space-y-2 w-full bg-transparent">
                      <Search className="h-6 w-6" />
                      <span className="text-sm">learn</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Bookmark className="h-6 w-6" />
                    <span className="text-sm">Saved</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Clock className="h-6 w-6" />
                    <span className="text-sm">History</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">Trending</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Recent Searches</CardTitle>
                <CardDescription>Your latest knowledge explorations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{search.query}</p>
                          <p className="text-sm text-muted-foreground">
                            {search.results} results • {search.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Search Again
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Hadith */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Saved Hadith</CardTitle>
                <CardDescription>Your bookmarked Islamic knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedHadith.map((hadith) => (
                    <div key={hadith.id} className="p-4 rounded-lg bg-muted/30 space-y-3">
                      <p className="text-foreground leading-relaxed">"{hadith.text}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{hadith.source}</Badge>
                          <Badge className="bg-green-100 text-green-800">{hadith.grade}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Saved {hadith.savedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Verse */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Verse of the Day</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="arabic-text text-primary text-lg leading-relaxed">وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</div>
                <p className="text-sm text-foreground">"And whoever fears Allah - He will make for him a way out."</p>
                <p className="text-xs text-muted-foreground">Quran 65:2</p>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Searches this month</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hadith saved</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Days active</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Knowledge level</span>
                  <Badge className="bg-primary text-primary-foreground">Intermediate</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Islamic Calendar */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Islamic Calendar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">15 Jumada al-Awwal 1446</span>
                </div>
                <p className="text-xs text-muted-foreground">Next: Jumada al-Thani in 15 days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
