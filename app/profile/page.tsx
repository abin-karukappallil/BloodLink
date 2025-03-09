"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, LogOut, Phone, Droplets, Edit2, Check, X, Loader2, ArrowLeft } from "lucide-react"
import Dropdown from "@/components/ui/dropdown"
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import DonorForm from "@/components/custom/donor-form"
import { useRouter } from "next/navigation"

export default function Profile() {
  const [editProfile, setEditProfile] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [bloodgroup, setBloodgroup] = useState("")
  const [city, setCity] = useState("")
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
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    bloodgroup: "",
    city: ""
  })
  const [isDonor, setIsDonor] = useState(false)
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  const router = useRouter()

  const fetchDetails = async () => {
    try {
      setInitialLoad(true)
      const id = Cookies.get("userId")
      const res = await fetch(`/api/updates?id=${id}`)
      const data = await res.json()
      const d = Cookies.get("donor")
      if (d == "yes") {
        setIsDonor(true)
      } else {
        setIsDonor(false)
      }
      setName(data.row[0].name)
      setBloodgroup(data.row[0].bloodgroup)
      setEmail(data.row[0].email)
      setPhonenumber(data.row[0].phonenumber)
      setCity(data.row[0].city)

      setOriginalData({
        name: data.row[0].name,
        bloodgroup: data.row[0].bloodgroup,
        email: data.row[0].email,
        phonenumber: data.row[0].phonenumber,
        city: data.row[0].city,
      })
    } catch (e) {
      console.log(e)
      toast({
        variant: "destructive",
        title: "Error fetching profile",
        description: "Could not load your profile information.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } finally {
      setInitialLoad(false)
    }
  }

  const updateProfile = async () => {
    try {
      setLoading(true)
      const id = Cookies.get("userId")
      const res = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phonenumber, bloodgroup, id, city }),
      })

      if (res.ok) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
          variant: "default",
          className: "bg-green-800 text-white border-green-700",
        })
        setOriginalData({
          name,
          email,
          phonenumber,
          bloodgroup,
          city,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "There was a problem updating your profile.",
        })
      }
    } catch (e) {
      console.log(e)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      })
    } finally {
      setLoading(false)
      setEditProfile(false)
    }
  }

  const cancelEdit = () => {
    setName(originalData.name)
    setEmail(originalData.email)
    setPhonenumber(originalData.phonenumber)
    setBloodgroup(originalData.bloodgroup)
    setCity(originalData.city)
    setEditProfile(false)
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const logout = () => {
    Cookies.remove("token")
    Cookies.remove("userId")
    Cookies.remove("donor")
    router.push("/login")
  }
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  if (initialLoad) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-green-400 animate-spin" />
          <p className="text-green-400 text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full text-white">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          variant="ghost"
          className="group text-white hover:bg-white/10 transition-all duration-300"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:translate-x-[-3px] transition-transform duration-300" />
          <span className="sm:inline hidden">Back to Home</span>
        </Button>
      </motion.div>
      <div className="flex overflow-hidden flex-col items-end justify-center pt-6 pr-6">
        <Button
          variant="outline"
          className="border-red-500/5 bg-red-500/10 text-red-400 hover:bg-red-300/10 hover:text-red-300 transition-all duration-300 group z-10"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          <span className="sm:inline hidden">Logout</span>
        </Button>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/60 border-gray-700 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-900/40 to-emerald-800/40 relative">
              <div className="absolute -bottom-16 left-4 sm:left-8">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-gray-800 shadow-lg">
                  <AvatarImage src="/default.jpg" alt={name} />
                  <AvatarFallback className="bg-green-700 text-white text-2xl">
                    {name.split(' ').map(word => word[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="absolute top-4 right-4">
                <AnimatePresence mode="wait">
                  {!editProfile ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        onClick={() => setEditProfile(true)}
                        variant="outline"
                        size="sm"
                        className="bg-gray-800/40 border-gray-600 hover:bg-gray-700 text-white"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="actions"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2"
                    >
                      <Button
                        onClick={updateProfile}
                        variant="default"
                        size="sm"
                        disabled={loading}
                        className="bg-green-700 hover:bg-green-600 text-white"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEdit}
                        disabled={loading}
                        className="bg-gray-800/40 border-gray-600 hover:bg-gray-700 text-white"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <CardContent className="pt-20 pb-8 px-4 sm:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={slideUp} initial="hidden" animate="visible" className="space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {editProfile ? (
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-700/60 border-gray-600 text-white text-xl sm:text-2xl font-bold h-auto py-1 px-2"
                        />
                      ) : (
                        name
                      )}
                    </h1>
                    <div className="flex items-center gap-2 text-green-400 max-w-full">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {editProfile ? (
                        <div className="w-full max-w-xs">
                          <Dropdown
                            label=""
                            options={keralaCities}
                            value={city}
                            onChange={(newCity) => setCity(newCity)}
                            placeholder="Select City"
                            name="city"
                          />
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-white">{city}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {isDonor && (
                      <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700 px-3 py-1">
                        Blood Group: {bloodgroup}
                      </Badge>
                    )}
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400">Contact Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-700/40 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Email</p>
                          {editProfile ? (
                            <Input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-gray-700/60 border-gray-600 text-white h-8 mt-1"
                              placeholder="Your email"
                            />
                          ) : (
                            <p className="text-gray-200 break-words">{email}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-gray-700/40 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Phone</p>
                          {editProfile ? (
                            <Input
                              value={phonenumber}
                              onChange={(e) => setPhonenumber(e.target.value)}
                              className="bg-gray-700/60 border-gray-600 text-white h-8 mt-1"
                              placeholder="Your phone number"
                            />
                          ) : (
                            <p className="text-gray-200">{phonenumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {isDonor ? (
                  <motion.div
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="bg-gray-700/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                        <Droplets className="h-5 w-5" />
                        Blood Donation Profile
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Blood Group</span>
                          {editProfile ? (
                            <div className="w-28 sm:w-32">
                              <Dropdown
                                label=""
                                options={bloodGroups}
                                value={bloodgroup}
                                onChange={(newBloodGroup) => setBloodgroup(newBloodGroup)}
                                placeholder="Select Blood Group"
                                name="bloodgroup"
                              />
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-white">{bloodgroup}</span>
                          )}
                        </div>

                        <Separator className="bg-gray-600/50" />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Donation</span>
                            <span className="text-white">3 months ago</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total Donations</span>
                            <span className="text-white">5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Eligibility Status</span>
                            <span className="text-green-400">Eligible</span>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-green-700 hover:bg-green-600 text-white">
                            Schedule Donation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="bg-gray-700/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                        <Droplets className="h-5 w-5" />
                        Guest User Profile
                      </h2>

                      <div className="space-y-4">
                        <Separator className="bg-gray-600/50" />

                        <div className="space-y-2 flex justify-center items-center">
                          <DonorForm />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}