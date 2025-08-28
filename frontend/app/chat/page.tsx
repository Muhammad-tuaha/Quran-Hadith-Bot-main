"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Search, BookOpen, Filter, Loader2 } from "lucide-react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

function getUserId(user: User | null) {
  if (user) return user.uid
  let guestId = localStorage.getItem("guestId")
  if (!guestId) {
    guestId = crypto.randomUUID()
    localStorage.setItem("guestId", guestId)
  }
  return guestId
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("both")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any | null>(null)

  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setUserId(getUserId(currentUser))
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !userId) return
    setIsSearching(true)
    try {
      const response = await fetch("https://tahasoomro-hojadeploy.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Question: searchQuery, filter: searchType, userID: userId }),
      })
      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()
      setResults(data) // ✅ matches { summary, references }
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Navbar */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-serif font-bold">Islamic AI Agent</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.displayName || user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link href="/signup"><Button size="sm">Get Started</Button></Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Search Islamic Knowledge</h1>
        <p className="text-muted-foreground mb-4">Explore authentic Quranic verses and Ahadith for your query. </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif"><Filter className="h-5 w-5" /> Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Search In</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">All Sources</SelectItem>
                    <SelectItem value="Ahadith">Hadith Only</SelectItem>
                    <SelectItem value="Quran">Quran Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results + Search */}
        <div className="lg:col-span-3 space-y-6">

          {/* ✅ Show results above search */}
          {results && (
            <Card>
              <CardContent className="p-6 space-y-6">
                {results.summary && <p className="text-base leading-relaxed">{results.summary}</p>}
                <div className="space-y-4">
                  {results.references?.map((ref: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg border bg-card space-y-2">
                      {ref.type === "Quran" ? (
                        <>
                          <p className="arabic-text text-lg">{ref.ayahArabic}</p>
                          <p className="italic text-muted-foreground">{ref.ayahEnglish}</p>
                          <p className="text-sm text-primary">📖 {ref.reference} — Surah {ref.surah}, Ayah {ref.ayahNumber}</p>
                        </>
                      ) : ref.type === "Hadith" ? (
                        <>
                          <p className="arabic-text text-lg">{ref.textArabic}</p>
                          <p className="italic text-muted-foreground">{ref.textEnglish}</p>
                          <p className="text-sm text-primary">📘 {ref.book}, Hadith {ref.hadithNumber} — Grade: {ref.grade}</p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Unknown reference type</p>
                      )}
                    </div>
                  ))}
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground">⚠️ Quran and Hadith datasets were used; mistakes are possible.</p>
              </CardContent>
            </Card>
          )}

          {/* ✅ Search box with icon button */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <Label htmlFor="search">Search Query</Label>
                <div className="relative">
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Quran..."
                    className="pl-10 pr-12 h-12"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                  >
                    {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
