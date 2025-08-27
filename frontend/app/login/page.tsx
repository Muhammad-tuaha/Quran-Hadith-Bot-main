"use client"

import type React from "react"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, BookOpen, Star } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Logged in:", userCredential.user)
      window.location.href = "/"
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log("Google user:", result.user)
      window.location.href = "/"
    } catch (error: any) {
      alert(error.message)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted islamic-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header with Islamic elements */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-3 bg-primary rounded-full">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-primary fill-primary" />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Islamic AI Agent</h1>
            <p className="text-muted-foreground mt-2">Access authentic Islamic knowledge</p>
            <div className="arabic-text text-primary text-lg mt-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the Islamic knowledge base</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input border-border pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/signup" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline">
                  Sign up
                </Link>
              </div>
                  <Button
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
            

        <div className="text-center text-xs text-muted-foreground">
          <p>Seeking knowledge is an obligation upon every Muslim</p>
          <p className="arabic-text text-primary mt-1">طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ</p>
        </div>
      </div>
    </div>
  )
}
