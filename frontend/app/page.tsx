"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Users, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-serif font-bold">Islamic AI Agent</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user.displayName || user.email}
                  </span>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                Discover Authentic
                <span className="text-primary block">Islamic Knowledge</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered search through authentic Hadith and Quran verses with detailed Sanad, grading, and chain of
                narrators from trusted Islamic sources.
              </p>
              <div className="arabic-text text-primary text-2xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline">
                  Start Chating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Comprehensive Islamic Research</h2>
          <p className="text-lg text-muted-foreground">
            Access authenticated Islamic knowledge with scholarly precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-border/50">
            <CardHeader>
              <Search className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-serif">AI-Powered Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Intelligent search through vast collections of Hadith and Quranic verses with contextual understanding.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-serif">Authentic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete Sanad chains, scholarly grading (Sahih, Hasan, Da'if), and verified narrators for each Hadith.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-serif">Comprehensive Database</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access to major Hadith collections including Bukhari, Muslim, Abu Dawud, Tirmidhi, and more.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-serif">Scholar Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with Islamic scholars and researchers worldwide for deeper understanding and verification.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-serif font-bold">Islamic AI Agent</span>
            </div>
            <p className="text-muted-foreground">Dedicated to preserving and sharing authentic Islamic knowledge</p>
            <div className="arabic-text text-primary">وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا</div>
            <p className="text-xs text-muted-foreground">
              {"And you have not been given of knowledge except a little"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
