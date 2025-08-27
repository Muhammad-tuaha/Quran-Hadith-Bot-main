"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Star, UserPlus } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      alert("✅ Registration successful! Please log in.")
      router.push("/login")
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log("Google user:", result.user)
      alert("✅ Logged in successfully with Google")
      router.push("/")
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
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-primary fill-primary" />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              {user ? `Welcome, ${user.displayName || user.email}` : "Join Our Community"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {user ? "You are already signed in 🎉" : "Start your journey of Islamic knowledge"}
            </p>
            {!user && (
              <>
                <div className="arabic-text text-primary text-lg mt-2">وَقُل رَّبِّ زِدْنِي عِلْمًا</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {"And say: My Lord, increase me in knowledge"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* If user is already logged in → don’t show signup form */}
        {!user ? (
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-serif">Create Account</CardTitle>
              <CardDescription>Join thousands of Muslims seeking authentic knowledge</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"

                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Account
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary underline">
                    Sign in
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
        ) : (
          <Card className="p-6 text-center">
            <p className="text-lg">🎉 You are logged in as {user.displayName || user.email}</p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Knowledge is the treasure that follows its owner everywhere</p>
          <p className="arabic-text text-primary mt-1">الْعِلْمُ كَنْزٌ يَتْبَعُ صَاحِبَهُ أَيْنَمَا ذَهَبَ</p>
        </div>
      </div>
    </div>
  )
}
