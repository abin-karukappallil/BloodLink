"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Mail, Phone, Lock, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"

export default function LoginForm() {
  const [loginType, setLoginType] = useState("email")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const req = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      })
      const res = await req.json()
      if (!req.ok) {
        setError(res.error || "Invalid login")
        return
      }
      console.log(res);
      const token = req.headers.get("Authorization")?.replace("Bearer ", "")
      if (!token) {
        setError("Authentication failed. No token received.")
        return
      }
      Cookies.set("token", token, { secure: true, sameSite: "Strict" })
      
      if (res.user.donor) {
        Cookies.set("donor", res.user.donor, { secure: true, sameSite: "Strict" })
      }
      if (res.user.hospital) {
        Cookies.set("hospital", res.user.hospital, { secure: true, sameSite: "Strict" })
        Cookies.set("hosId", JSON.stringify(res.user.id), { secure: true, sameSite: "Strict" })
        router.push("/hospital")
        console.log("ok");
        return;
      }else{
      Cookies.set("userId", JSON.stringify(res.user.id), { secure: true, sameSite: "Strict" })
      router.push("/")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl z-0"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text pb-1">
            Login to BloodLink
          </CardTitle>
          <p className="text-gray-400 mt-2 text-sm">
            Your connection to life-saving donations
          </p>
        </motion.div>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-4">
        <motion.div 
          className="mb-6 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            type="button"
            variant={loginType === "email" ? "default" : "outline"}
            onClick={() => setLoginType("email")}
            className={`relative overflow-hidden transition-all duration-300 ${
              loginType === "email"
                ? "bg-gray-700/30 border-gray-600/50 text-white"
                : "bg-gray-700/30 border-gray-600/50 text-white"
            }`}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
            {loginType === "email" && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                layoutId="activeTab"
              />
            )}
          </Button>
          <Button
            type="button"
            variant={loginType === "phone" ? "default" : "outline"}
            onClick={() => setLoginType("phone")}
            className={`relative overflow-hidden transition-all duration-300 ${
              loginType === "phone"
                ? "bg-gray-700/30 border-gray-600/50 text-white"
                : "bg-gray-700/30 border-gray-600/50 text-white hover:border-red-400"
            }`}
          >
            <Phone className="mr-2 h-4 w-4" />
            Phone
            {loginType === "phone" && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                layoutId="activeTab"
              />
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center p-3 mb-4 text-sm rounded-lg bg-red-500/20 text-red-200 border border-red-500/30"
            >
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div 
            className="space-y-2"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label htmlFor="identifier" className="text-gray-100 flex items-center">
              {loginType === "email" ? (
                <>
                  <Mail className="h-4 w-4 mr-2 text-red-400" />
                  Email Address
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-2 text-red-400" />
                  Phone Number
                </>
              )}
            </Label>
            <div className="relative">
              <Input
                id="identifier"
                type={loginType === "email" ? "email" : "tel"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400 pl-10 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                placeholder={loginType === "email" ? "your.email@example.com" : "Your phone number"}
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {loginType === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label htmlFor="password" className="text-gray-100 flex items-center">
              <Lock className="h-4 w-4 mr-2 text-red-400" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400 pl-10 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-none mt-6 h-11 relative overflow-hidden group"
              disabled={loading}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              {loading ? (
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </motion.div>
              ) : (
                "Login"
              )}
            </Button>
          </motion.div>
        </form>
        
        <motion.div 
          className="mt-6 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-red-400 hover:text-red-300 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}