"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, BookOpen, Filter, Star, User, Settings, LogOut, Loader2 } from "lucide-react"

const hadithCollections = [
  { id: "bukhari", name: "Sahih al-Bukhari", count: "7,563" },
  { id: "muslim", name: "Sahih Muslim", count: "7,190" },
  { id: "abudawud", name: "Sunan Abu Dawud", count: "5,274" },
  { id: "tirmidhi", name: "Jami' at-Tirmidhi", count: "3,956" },
  { id: "nasai", name: "Sunan an-Nasa'i", count: "5,761" },
  { id: "ibnmajah", name: "Sunan Ibn Majah", count: "4,341" },
]

const hadithGrades = [
  { id: "sahih", name: "Sahih (Authentic)", color: "bg-green-100 text-green-800" },
  { id: "hasan", name: "Hasan (Good)", color: "bg-blue-100 text-blue-800" },
  { id: "daif", name: "Da'if (Weak)", color: "bg-yellow-100 text-yellow-800" },
  { id: "maudu", name: "Maudu' (Fabricated)", color: "bg-red-100 text-red-800" },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([]) // store API response

  const handleCollectionToggle = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId],
    )
  }

  const handleGradeToggle = (gradeId: string) => {
    setSelectedGrades((prev) => (prev.includes(gradeId) ? prev.filter((id) => id !== gradeId) : [...prev, gradeId]))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      const response = await fetch("http://127.0.0.1:8001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Question: searchQuery,
          filter: searchType,
        }),
      })

      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()

      setResults([
        {
          text: data.response, // backend returns { response: "..." }
          source: "Backend",
        },
      ])
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

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
              <Button variant="ghost" size="sm"><User className="h-4 w-4 mr-2" /> Profile</Button>
              <Button variant="ghost" size="sm"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
              <Button variant="ghost" size="sm"><LogOut className="h-4 w-4 mr-2" /> Sign Out</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center mb-4">
    {/* Islamic crescent with star image */}
    <img
      src="/islamic.png"
      alt="Islamic Symbol"
      className="h-20 w-20"
    />
  </div>

        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Search Islamic Knowledge</h1>
        <p className="text-muted-foreground mb-4">
          Discover authentic Hadith and Quranic verses with detailed scholarly information
        </p>
        <div className="text-xl font-bold text-right pr-4">اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ</div>
        <p className="text-l text-muted-foreground mt-1">Seek knowledge from the cradle to the grave</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Filter className="h-5 w-5" /> Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Search In</Label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="hadith">Hadith Only</SelectItem>
                      <SelectItem value="quran">Quran Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                {/* Collections */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Hadith Collections</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {hadithCollections.map((c) => (
                      <div key={c.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={c.id}
                          checked={selectedCollections.includes(c.id)}
                          onCheckedChange={() => handleCollectionToggle(c.id)}
                        />
                        <Label htmlFor={c.id} className="flex-1 text-sm">{c.name}</Label>
                        <Badge variant="secondary" className="text-xs">{c.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                {/* Grades */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Authenticity Grade</Label>
                  {hadithGrades.map((g) => (
                    <div key={g.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={g.id}
                        checked={selectedGrades.includes(g.id)}
                        onCheckedChange={() => handleGradeToggle(g.id)}
                      />
                      <Label htmlFor={g.id} className="flex-1 text-sm">{g.name}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Search + Results */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <Label htmlFor="search" className="text-sm font-medium">Search Query</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Hadith or Quran..."
                      className="pl-10 h-12"
                      disabled={isSearching}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12" disabled={isSearching || !searchQuery.trim()}>
                    {isSearching ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Searching...</>
                    ) : (
                      <><Search className="h-4 w-4 mr-2" /> Search</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div>
              {results.length === 0 ? (
                <p className="text-muted-foreground">No results yet</p>
              ) : (
                <div className="space-y-4">
                  {results.map((r, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4">
                        <p className="text-base">{r.text}</p>
                        <p className="text-sm text-muted-foreground mt-2">Source: {r.source || "Unknown"}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <Card className="border-border/50 mt-10">
          <CardHeader>
            <CardTitle className="font-serif">Popular Searches</CardTitle>
            <CardDescription>Explore these commonly searched topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Prayer (Salah)", "Charity (Zakat)", "Fasting (Sawm)", "Pilgrimage (Hajj)", "Faith (Iman)",
                "Patience (Sabr)", "Gratitude (Shukr)", "Knowledge (Ilm)", "Justice (Adl)", "Mercy (Rahma)",
                "Forgiveness (Maghfira)", "Paradise (Jannah)",
              ].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto py-2 px-3 text-left bg-transparent"
                  onClick={() => setSearchQuery(topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">40,000+</div>
              <div className="text-sm text-muted-foreground">Hadith Records</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">6,236</div>
              <div className="text-sm text-muted-foreground">Quranic Verses</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground">Verified Narrators</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Islamic Scholars</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
  
}

