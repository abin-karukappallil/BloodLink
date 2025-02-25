"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Users, Calendar, ChevronRight } from "lucide-react"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import CountUp from "@/components/ui/count-up";
import DonorForm from "@/components/custom/donor-form";

export default function BloodDonorSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
      router.push("/login");
    }
  }

  useEffect(() => {
    checkLogin();
    const handleStorageChange = () => {
      checkLogin();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-gray-100">
      <header className="bg-gray-900/30 backdrop-blur-sm shadow-lg border-b border-gray-800/50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text"
          >
            BloodLink
          </motion.h1>
          <div className="flex items-center space-x-6">
            {!isLoggedin && (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Login
                </Button>
              </Link>)}
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-20 p-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
          </h2>
          <p className="text-xl mb-8 flex items-center justify-center text-gray-100">Connecting donors with those in need</p>
          
         <DonorForm />
          
        </motion.section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 md:w-full w-full">
          <TabsList className="grid w-full  grid-cols-3 mt-32 gap-4 bg-transparent">
            {["dashboard", "donors", "inventory"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="py-3 text-xs md:text-base capitalize bg-gray-800/20 backdrop-blur-sm shadow-md rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Total Donors", icon: Users, value: 1234 },
                    { title: "Recent Donations", icon: Droplet, value: 56 },
                    { title: "Scheduled Donations", icon: Calendar, value: 23 },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-medium text-gray-100">{item.title}</CardTitle>
                          <item.icon className="h-6 w-6 text-red-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-white">
                            <CountUp
                              from={0}
                              to={(item.value)}
                              separator=","
                              direction="up"
                              duration={1}
                              className="count-up-text"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Donors">
                <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Recent Donations</CardTitle>
                    <CardDescription className="text-gray-100">View and manage recent blood donations.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["John Doe", "Jane Smith", "Alex Johnson"].map((name, index) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          <span className="text-white">{name}</span>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="inventory">
                <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Blood Inventory</CardTitle>
                    <CardDescription className="text-gray-100">Current blood type availability.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"].map((type, index) => (
                        <motion.div
                          key={type}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="text-center p-6 bg-gray-700/20 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <div className="text-3xl font-bold text-white">{type}</div>
                          <div className="text-sm text-gray-100 mt-2">Available</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}