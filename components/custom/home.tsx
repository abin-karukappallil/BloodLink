"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, ArrowRight, ChevronDown, Droplet, Activity, MapPin, Plus, Minus } from "lucide-react"
import Image from "next/image"
import CountUp from "@/components/ui/count-up"
import { useRouter } from "next/navigation"
import { FAQSection } from "@/components/custom/faq-section"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsVisible(true)

    // const interval = setInterval(() => {
    //   setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    // }, 5000)

    // return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: 150, label: "Donors Registered", icon: Users },
    { value: 200, label: "Lives Saved", icon: Heart },
    { value: 98, label: "Satisfaction Rate", icon: Award },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-c">
            <div className="flex items-center">
              <Droplet className="w-9 h-9 text-red-600" />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold text-gray-100">
                <span className="m-0 p-0 text-red-700">B</span>loodLink
              </h1>
              <p className="text-[0.50rem] md:text-xs text-gray-400">Connecting Donors,Saving Lives</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/login")}
              className="text-red-400  border-red-800 hover:bg-red-950"
            >
              Log In
            </Button>
            <Button size="sm" onClick={() => router.push("/signup")} className="bg-red-600 hover:bg-red-700">
              Sign Up
            </Button>
          </div>
        </div>
      </motion.header>
      <div className="h-16"></div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/70 to-red-900/40 z-0"></div>
        <div className="container relative z-10 px-4 py-24 mx-auto sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-lg"
            >
              <motion.div
                animate={pulseAnimation}
                className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-red-700 bg-red-100 rounded-full"
              >
                <Droplet className="w-4 h-4 mr-2" />
                Saving Lives Together
              </motion.div>
              <motion.h1
                className="mb-6 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Every Drop <span className="text-red-600">Matters</span>, Every Donor{" "}
                <span className="text-red-600">Counts</span>
              </motion.h1>
              <motion.p
                className="mb-8 text-lg text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Join our community of lifesavers. Our advanced blood donor management system connects donors with
                recipients efficiently, ensuring that help is always available when needed.
              </motion.p>
              <motion.div
                className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button size="lg" onClick={() => router.push("/login")} className="bg-red-600 hover:bg-red-700">
                  Become a Donor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/login")}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Find Blood Centers
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative lg:pl-8"
            >
              <motion.div
                className="relative mx-auto overflow-hidden rounded-lg shadow-xl aspect-video"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/home.jpg?height=500&width=800"
                  alt="Blood donation illustration"
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent"></div>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg md:bottom-8 md:left-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                    <Activity className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Emergency Response</p>
                    <p className="text-xl font-bold text-gray-900">Under 30 mins</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href="#features"
            className="flex items-center justify-center w-10 h-10 mb-4 text-red-400 bg-gray-800 rounded-full shadow-md hover:bg-gray-700"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </section>
      <section className="py-16 bg-gray-950">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeIn} whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <stat.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-100">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1.5}
                    className="count-up-text"
                  />
                  {stat.value == 150 ? "K" : stat.value == 200 ? "K" : "%"}
                </h3>
                <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="features" className="py-20 bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-100 sm:text-4xl">Streamlined Blood Donation Management</h2>
            <p className="text-lg text-gray-300">
              Our comprehensive system connects donors, recipients, and medical facilities in real-time, ensuring
              efficient blood supply management.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-1 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Real-time Tracking",
                description:
                  "Monitor blood inventory levels across facilities in real-time, with automated alerts for critical shortages.",
                icon: Activity,
                color: "bg-green-100 text-green-600",
              },
              {
                title: "Donor Matching",
                description:
                  "Advanced matching algorithm connects donors with recipients based on blood type, location, and urgency.",
                icon: Users,
                color: "bg-purple-100 text-purple-600",
              },
              {
                title: "Location Services",
                description:
                  "Find the nearest donation centers or mobile blood drives with real-time availability information.",
                icon: MapPin,
                color: "bg-amber-100 text-amber-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="relative p-6 bg-gray-800 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FAQSection />
    
      <footer className="py-12 bg-black text-gray-300">
        <div className="container flex flex-col px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-row justify-evenly">
            <div>
              <div className="flex items-center mb-4">
                <Droplet className="w-6 h-6 mr-2 text-red-500" />
                <span className="text-xl font-bold text-white">BloodLink</span>
              </div>
              <p className="mb-4 text-sm">
                Connecting donors with recipients through innovative technology, making blood donation more accessible
                and efficient.
              </p>
            </div>

            <div>
              <ul className="space-y-2">
                {["About Us", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-700">
            <p className="text-sm text-center text-gray-400">
              © {new Date().getFullYear()} BloodLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

