"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, BookOpen, Loader2, ArrowRight } from "lucide-react"
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
  const [messages, setMessages] = useState<any[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setUserId(getUserId(currentUser))
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !userId) return

    const userMessage = { type: "user", content: searchQuery }
    setMessages((prev) => [...prev, userMessage])
    setIsSearching(true)
    setSearchQuery("")

    try {
      const response = await fetch("https://tahasoomro-hojadeploy.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Question: searchQuery, filter: searchType, userID: userId }),
      })
      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()
      const cleaned = data ? data : { summary: "No response", references: [] }
      const botMessage = { type: "bot", content: cleaned }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-sm">
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
        <p className="text-muted-foreground mb-4">Explore authentic Quranic verses and Ahadith for your query.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <Label>Search In:</Label>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="both">All Sources</SelectItem>
              <SelectItem value="Ahadith">Hadith Only</SelectItem>
              <SelectItem value="Quran">Quran Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chat History */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto border rounded-lg p-4 bg-card scrollbar-none">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg p-3 max-w-[80%] ${msg.type === "user" ? "bg-primary text-white" : "bg-background text-foreground"}`}>
                {msg.type === "user" ? (
                  <p>{msg.content}</p>
                ) : (
                  <>
                    {msg.content.summary && <p>{msg.content.summary}</p>}
                    {msg.content.references?.map((ref: any, j: number) => (
                      <div key={j} className="p-2 mt-1 rounded-lg border bg-card">
                        {ref.type === "Quran" ? (
                          <>
                            <p className="arabic-text text-lg">{ref.ayahArabic}</p>
                            <p className="italic text-muted-foreground">{ref.ayahEnglish}</p>
                          </>
                        ) : (
                          <>
                            <p className="arabic-text text-lg">{ref.textArabic}</p>
                            <p className="italic text-muted-foreground">{ref.textEnglish}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSearch} className="mt-4 flex items-center gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 h-12"
          />
          <Button type="submit" disabled={isSearching || !searchQuery.trim()} className="h-12 w-12 p-0">
            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
