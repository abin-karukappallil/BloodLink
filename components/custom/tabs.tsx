/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Users, Calendar, Activity, AlertCircle, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "@/components/ui/count-up"
import Dropdown from "@/components/ui/dropdown"
import { Badge } from "@/components/ui/badge"


export default function SelectionTab() {
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [donors, setDonors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [inventory,setInventory] = useState<any[]>([])

  const keralaCities = [
    "Adoor", "Alappuzha", "Aluva", "Angamaly", "Anthoor", "Attingal",
    "Chalakudy", "Changanassery", "Chavakkad", "Chengannur", "Cherpulassery",
    "Cherthala", "Chittur-Thathamangalam", "Erattupetta", "Eloor", "Ettumanoor",
    "Feroke", "Guruvayur", "Haripad", "Idukki", "Irinjalakuda", "Iritty",
    "Kalpetta", "Kalamassery", "Kanhangad", "Kannur", "Karunagappalli",
    "Kasaragod", "Kayamkulam", "Kizhakkekallada", "Kodungallur", "Koduvally",
    "Kollam", "Kondotty", "Koothattukulam", "Kothamangalam", "Kottakkal",
    "Kottarakara", "Kottayam", "Kozhikode", "Koyilandy", "Kunnamkulam",
    "Kuthuparamba", "Malappuram", "Mananthavady", "Manjeri", "Mannarkkad",
    "Maradu", "Mattannur", "Mavelikkara", "Mattanur", "Mukkam",
    "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Nilambur", "Nileshwaram",
    "North Paravur", "Ottappalam", "Palakkad", "Pala", "Pandalam",
    "Panoor", "Parappanangadi", "Paravur", "Pathanamthitta", "Pattambi",
    "Payyanur", "Payyoli", "Perinthalmanna", "Perumbavoor", "Piravom",
    "Ponnani", "Punalur", "Ramanattukara", "Shornur", "Sreekandapuram",
    "Sultan Bathery", "Taliparamba", "Tanur", "Thalassery", "Thiruvalla",
    "Thiruvananthapuram", "Thodupuzha", "Thrikkakkara", "Thrissur", "Tirur",
    "Tirurangadi", "Vadakara", "Vaikom", "Valanchery", "Varkala",
    "Wadakkancherry"
];

  const bloodInventory = inventory;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  useEffect(() => {
    const fetchDonors = async () => {
      if (selectedCity) {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/users?city=${selectedCity}`)
          if (!response.ok) throw new Error("Failed to fetch donors")
          const data = await response.json()
          setDonors(data.donors)
        } catch (error) {
          console.error("Error fetching donors:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    const fetchInventory = async () => {
        const res = await fetch("/api/inventory");
        const data = await res.json();
        setInventory(data);
    };
    fetchDonors();
    fetchInventory();
  }, [selectedCity])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }
  
  return (
    <main className="container mx-auto px-6 pb-20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-2xl blur-xl"></div>
          <TabsList className="grid w-full grid-cols-3 md:mt-36 mt-11 gap-4 bg-transparent relative">
            {["dashboard", "donors", "inventory"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="py-3 text-xs md:text-base capitalize bg-gray-900/70 backdrop-blur-sm shadow-md rounded-lg transition-all duration-300 
                                data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-500 
                                data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/20 data-[state=active]:text-white"
              >
                {tab === "dashboard" && <Activity className="mr-2 h-4 w-4" />}
                {tab === "donors" && <Users className="mr-2 h-4 w-4" />}
                {tab === "inventory" && <Droplet className="mr-2 h-4 w-4" />}
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TabsContent value="dashboard" className="space-y-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { title: "Total Donors", icon: Users, value: 1234, color: "from-blue-600/20 to-blue-400/10" },
                  { title: "Recent Donations", icon: Droplet, value: 56, color: "from-red-600/20 to-red-400/10" },
                  {
                    title: "Scheduled Donations",
                    icon: Calendar,
                    value: 23,
                    color: "from-emerald-600/20 to-emerald-400/10",
                  },
                ].map((item, index) => (
                  <motion.div key={item.title} variants={itemVariants} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-xl blur-md group-hover:blur-xl transition-all duration-300"></div>
                    <Card
                      className="bg-gray-900/70 border-gray-800/30 backdrop-blur-sm shadow-lg overflow-hidden relative z-10
                                                       hover:shadow-red-500/10 hover:border-red-500/20 transition-all duration-500"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`}></div>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                        <CardTitle className="text-lg font-medium text-white">{item.title}</CardTitle>
                        <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm">
                          <item.icon className="h-5 w-5 text-red-400" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="text-4xl font-bold text-white">
                          <CountUp
                            from={0}
                            to={item.value}
                            separator=","
                            direction="up"
                            duration={1.5}
                            className="count-up-text"
                          />
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {index === 0 && "+12% from last month"}
                          {index === 1 && "+5 in the last 24 hours"}
                          {index === 2 && "Next 7 days"}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-gray-900/70 border-gray-800/30 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest updates from the blood donation network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          message: "Emergency request for O- blood type in Kottayam",
                          time: "2 hours ago",
                          icon: AlertCircle,
                          urgent: true,
                        },
                        { message: "New donor registered from Thrissur", time: "5 hours ago", icon: Users },
                        {
                          message: "Successful donation completed at Kozhikode center",
                          time: "Yesterday",
                          icon: Heart,
                        },
                        {
                          message: "Blood drive scheduled for next weekend in Thiruvananthapuram",
                          time: "2 days ago",
                          icon: Calendar,
                        },
                      ].map((activity, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          className={`flex items-start gap-3 p-3 rounded-lg ${activity.urgent ? "bg-red-950/30 border border-red-800/30" : "bg-gray-800/30"}`}
                        >
                          <div className={`p-2 rounded-full ${activity.urgent ? "bg-red-500/20" : "bg-gray-700/50"}`}>
                            <activity.icon
                              className={`h-4 w-4 ${activity.urgent ? "text-red-400" : "text-gray-400"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-200">{activity.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                          {activity.urgent && (
                            <Badge
                              variant="destructive"
                              className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                            >
                              Urgent
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="donors">
              <Card className="bg-gray-900/70 border-gray-800/30 backdrop-blur-sm shadow-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Donor Directory</CardTitle>
                  <CardDescription className="text-gray-400">Find blood donors in your area</CardDescription>

                  <div className="w-full gap-4 mt-4">
                    <Dropdown
                      label="City"
                      options={keralaCities}
                      value={selectedCity}
                      onChange={setSelectedCity}
                      placeholder="Select a city"
                      required={true}
                      name="city"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-gray-800/50 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-800/70">
                        <TableRow className="hover:bg-gray-700/40 border-gray-700/30">
                          <TableHead className="text-white font-medium">Name</TableHead>
                          <TableHead className="text-white font-medium text-center">Phone</TableHead>
                          <TableHead className="text-white font-medium text-right">Blood Group</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-8">
                              <div className="flex flex-col items-center justify-center">
                                <div className="h-8 w-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin mb-2"></div>
                                <p className="text-gray-400">Loading donors...</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) :  selectedCity ? (
                          <>
                              {donors.map((donor) => (
                                <TableRow key={donor.id} className="hover:bg-gray-700/40 border-gray-700/30">
                                  <TableCell className="text-white text-left font-medium">{donor.name}</TableCell>
                                  <TableCell className="text-white text-center font-medium">{donor.phonenumber}</TableCell>
                                  <TableCell className="text-white text-right font-medium">{donor.bloodgroup}</TableCell>
                                </TableRow>
                              ))}
                              </>
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-8 text-gray-400">
                              No donors found in {selectedCity}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card className="bg-gray-900/70 border-gray-800/30 backdrop-blur-sm shadow-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Blood Inventory</CardTitle>
                  <CardDescription className="text-gray-400">
                    Current blood type availability across donation centers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  >
                    {bloodInventory.map((blood, index) => (
                      <motion.div key={blood.bloodgroup} variants={itemVariants} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/5 rounded-xl blur-md group-hover:blur-xl transition-all duration-300"></div>
                        <div
                          className={`relative z-10 text-center p-6 rounded-lg border ${getStatusColor(blood.status)} bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-red-500/10 transition-all duration-300`}
                        >
                          <div className="text-3xl font-bold text-white mb-1">{blood.bloodgroup}</div>
                          <div className="text-lg font-semibold text-gray-300">{blood.units} units</div>
                          <div className="mt-2">
                            <Badge className={getStatusColor(blood.status)}>
                              {blood.status === "high" && "Sufficient"}
                              {blood.status === "medium" && "Adequate"}
                              {blood.status === "low" && "Low"}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 p-6 rounded-xl bg-red-950/20 border border-red-900/30 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                      Critical Needs
                    </h3>
                    <p className="text-gray-300 mb-4">The following blood types are urgently needed:</p>
                    <div className="flex flex-wrap gap-3">
                      {bloodInventory
                        .filter((blood:any) => blood.status === "low")
                        .map((blood:any) => (
                          <Badge key={blood.bloodgroup} variant="destructive" className="text-sm py-1">
                            {blood.bloodgroup} - Urgent Need
                          </Badge>
                        ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </main>
  )
}

