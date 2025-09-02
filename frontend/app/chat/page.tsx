"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Loader2, ArrowRight } from "lucide-react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function getUserId(user: User | null) {
  if (user) return user.uid
  let guestId = localStorage.getItem("guestId")
  if (!guestId) {
    guestId = crypto.randomUUID()
    localStorage.setItem("guestId", guestId)
  }
  return guestId
}

const SOURCES = [
  { value: "Quran", label: "Quran" },
  { value: "bukhari", label: "Sahih al Bukhari" },
  { value: "muslim", label: "Sahih Muslim" },
  { value: "tirmidhi", label: "Jami'at-Tirmidhi" },
  { value: "sunan_nasai", label: "Sunan Nasai" },
  { value: "ibnmajah", label: "Ibn-e-Majah" },
  { value: "malik", label: "Muwatta Imam Malik" },
  { value: "ahmed", label: "Musnad Imam Ahmed" },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    Quran: true, // default checked
    bukhari: false,
    muslim: false,
    tirmidhi: false,
    sunan_nasai: false,
    ibnmajah: false,
    malik: false,
    ahmed: false,
  })
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

  // ⛔ Removed auto-scroll effect
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }, [messages])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const handleFilterChange = (value: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [value]: checked }))
  }

  const handleAllToggle = (checked: boolean) => {
    const newFilters: { [key: string]: boolean } = {}
    SOURCES.forEach((src) => (newFilters[src.value] = checked))
    setFilters(newFilters)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !userId) return

    const userMessage = { type: "user", content: searchQuery }
    setMessages((prev) => [...prev, userMessage])
    setIsSearching(true)
    setSearchQuery("")

    try {
      // Convert filters object to array of selected sources
      const activeFilters = Object.keys(filters).filter((key) => filters[key])

      const response = await fetch("https://tahasoomro-hojadeploy.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Question: searchQuery,
          filters: activeFilters, // only selected sources
          userID: userId,
        }),
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
      {/* Navbar */}
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
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
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

      {/* Responsive Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block w-64 border rounded-lg p-4 bg-card h-fit">
          <Label className="mb-2 block">Search In:</Label>
          <div className="space-y-2">
            {/* All Sources */}
            <div className="flex items-center space-x-2">
              <Checkbox
                className="border border-black"
                checked={Object.values(filters).every(Boolean)}
                onCheckedChange={(checked) => handleAllToggle(Boolean(checked))}
                id="all-sources"
              />
              <label htmlFor="all-sources" className="text-sm font-medium">
                All Sources
              </label>
            </div>
            {/* Individual Sources */}
            {SOURCES.map((src) => (
              <div key={src.value} className="flex items-center space-x-2">
                <Checkbox
                  className="bg-white border border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                  checked={filters[src.value]}
                  onCheckedChange={(checked) => handleFilterChange(src.value, Boolean(checked))}
                  id={src.value}
                />
                <label htmlFor={src.value} className="text-sm">
                  {src.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Dropdown Filters (Mobile) */}
        <div className="md:hidden mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                Select Sources
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sources</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={Object.values(filters).every(Boolean)}
                onCheckedChange={(checked) => handleAllToggle(Boolean(checked))}
              >
                All Sources
              </DropdownMenuCheckboxItem>
              {SOURCES.map((src) => (
                <DropdownMenuCheckboxItem
                  key={src.value}
                  checked={filters[src.value]}
                  onCheckedChange={(checked) => handleFilterChange(src.value, Boolean(checked))}
                >
                  {src.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chat + Input */}
        <div className="flex-1">
          {/* Chat History */}
          <div className="space-y-4 max-h-[700px] overflow-y-auto border rounded-lg p-5 bg-card text-lg leading-relaxed scrollbar-none">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-3 max-w-[85%] ${
                    msg.type === "user" ? "bg-primary text-white" : "bg-background text-foreground"
                  }`}
                >
                  {msg.type === "user" ? (
                    <p>{msg.content}</p>
                  ) : (
                    <>
                      {msg.content.summary && <p>{msg.content.summary}</p>}
                      {msg.content.references?.map((ref: any, j: number) => (
                        <div key={j} className="p-3 mt-2 rounded-lg border bg-card space-y-1">
                          {ref.type === "Quran" ? (
                            <>
                              <p className="font-semibold">
                                📖 {ref.reference} ({ref.surah} {ref.ayahNumber})
                              </p>
                              <p className="arabic-text text-lg">{ref.ayahArabic}</p>
                              <p className="italic text-muted-foreground">{ref.ayahEnglish}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold">📚 {ref.book}</p>
                              <p className="text-sm text-muted-foreground">
                                {ref.chapter} ({ref.chapter_ar})
                              </p>
                              <p className="text-xs text-gray-500">Grade: {ref.grade}</p>
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
          <form onSubmit={handleSearch} className="mt-4 flex flex-col sm:flex-row items-center gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your question..."
              className="w-full sm:flex-1 h-12"
            />
            <Button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="h-12 w-full sm:w-12 p-0"
            >
              {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-6 py-4 text-center text-xs text-gray-400 border-t space-y-1">
        <p>
          Developed by <span className="font-medium">Muhammad Taha</span>
        </p>
        <p>
          Contact:{" "}
          <a href="mailto:tahasoomro10@gmail.com" className="underline hover:text-gray-600">
            tahasoomro10@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/muhammad-taha-cs"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            www.linkedin.com/in/muhammad-taha-cs
          </a>
        </p>
      </footer>
    </div>
  )
}
