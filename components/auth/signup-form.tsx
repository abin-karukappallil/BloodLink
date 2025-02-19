// components/auth/signup-form.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import Link from "next/link"

export default function SignupForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add signup logic here
  }

  return (
    <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-100">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-100">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-100">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-100">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-100">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-none mt-6"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:text-red-300">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}