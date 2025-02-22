// app/(auth)/signup/page.tsx
"use client"

import { motion } from "framer-motion"
import SignupForm from "@/components/auth/signup-form"
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        
        <SignupForm />
      </motion.div>
    </div>
  )
}