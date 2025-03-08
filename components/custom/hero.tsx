"use client"
import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import DonorForm from "@/components/custom/donor-form"
import Cookies from "js-cookie"
import { CircleUserRound, Heart, Droplet } from "lucide-react"

function Hero() {
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const [isDonor, setIsDonor] = useState(false)

  const isDonorCheck = useCallback(() => {
    const donor = Cookies.get("donor")
    setIsDonor(donor === "yes")
  }, [])



  useEffect(() => {
    const fetchUserName = async () => {
      const userId = Cookies.get("userId")
      if (!userId) return

      try {
        const api = `api/userinfo?userId=${userId}`
        const res = await fetch(api)
        const data = await res.json()
        setUserName(data.name || "User")
      } catch (error) {
        console.error("Error fetching user info:", error)
      }
    }

    fetchUserName()
    isDonorCheck()
  }, [isDonorCheck])

  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[url('/images/blood-cells-bg.svg')] bg-fixed bg-cover opacity-10"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-red-950/30 to-black"></div>

      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-red-900/30 shadow-lg shadow-red-900/5">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Droplet className="h-8 w-8 text-red-500 fill-red-500/30" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold"
            >
              <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Blood</span>
              <span className="text-white">Link</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            <Button className="bg-transparent hover:bg-red-500/20 rounded-full w-fit" onClick={()=>router.push("/profile")}>
            <CircleUserRound size={36} color="#faebeb" />
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto mt-12 px-6 relative">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center relative"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 mb-8"
          >
            {isDonor && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4"
              >
                <Heart className="h-4 w-4 text-red-400 fill-red-400/30" />
                <span className="text-sm font-medium text-red-300">Verified Donor</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Welcome, {userName}
            </motion.h1>

            {!isDonor && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Your contribution can save lives. Join our community of donors and make a difference today.
              </motion.p>
            )}
          </motion.div>

          {isDonor ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 backdrop-blur-sm shadow-xl"
            >
              <h2 className="text-2xl font-bold text-red-300 mb-2">Thank You For Being a Donor</h2>
              <p className="text-gray-300">Your generosity helps save lives and brings hope to those in need.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <DonorForm />
            </motion.div>
          )}
        </motion.section>
      </main>
    </>
  )
}

export default Hero

