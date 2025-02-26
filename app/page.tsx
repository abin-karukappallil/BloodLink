/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Users, Calendar } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import CountUp from "@/components/ui/count-up";
import Dropdown from "@/components/ui/dropdown";
import DonorForm from "@/components/custom/donor-form";

export default function BloodDonorSystem() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [donors, setDonors] = useState<any[]>([]); 
  const [isDonor , setIsDonor] = useState(false);
  const [userName, setUserName] = useState();
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

  const router = useRouter();

  const checkLogin = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
      router.push("/login");
    }
}
, []);

const logout = () => {
  localStorage.clear();
  router.push("/login");
}
const isDonorCheck = () => {
  const donor = localStorage.getItem("donor");
  setIsDonor(donor === "yes"); 
};

  useEffect(() => {
    checkLogin();
    isDonorCheck();
    const handleStorageChange = () => {
      checkLogin();
      isDonorCheck();
    };
    window.addEventListener("storage", handleStorageChange);
  }, [router]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    const fetchDonors = async () => {
      if (selectedCity) {
        try {
          console.log(selectedCity)
          const response = await fetch(`/api/users?city=${selectedCity}`);

          if (!response.ok) throw new Error("Failed to fetch donors");
          const data = await response.json();
          setDonors(data.donors);
          console.log(data.donors)
        } catch (error) {
          console.error("Error fetching donors:", error);
        }
      }
    };
    fetchDonors();
  }, [selectedCity]);
  useEffect(()=>{
    const userName = async () => {
      const userId = localStorage.getItem("userId")
      const api = `api/userinfo?userId=${userId}`
      const res = await fetch(api);
      const data = await res.json();
      const user = data.name;
      setUserName(user);
    }
    userName();
  },[])
  return (
    <div className="md:h-screen h-[130vh] bg-gradient-to-br from-gray-950 via-gray-900 to-red-950  text-gray-100">
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
              {isLoggedin && (
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                  onClick={logout}
                >
                  Logout
                </Button>
              )
              }
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
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="text-4xl font-semibold"
          >Hey {userName}</motion.h1>

          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
          </h2>
          {isDonor ? (
          <h2 className="text-xl font-bold opacity-30">BLOOD DONOR</h2>
          ) :(<p className="text-xl mb-8 flex items-center justify-center text-gray-100">Connecting donors with those in need</p>)}
          
         { !isDonor && <DonorForm />}
         
          
        </motion.section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 md:w-full w-full">
          <TabsList className="grid w-full grid-cols-3 mt-36 gap-4 bg-transparent">
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
                              to={item.value}
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
              <TabsContent value="donors">
                <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Recent Donations</CardTitle>
                    <CardDescription className="text-gray-100">View and manage recent blood donations.</CardDescription>
                    <Dropdown
                      label="City"
                      options={keralaCities}
                      value={selectedCity}
                      onChange={setSelectedCity}
                      placeholder="Select a city"
                      required={true}
                      name="city"
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <span className="text-white text-sm">Name</span>
                          <p className="text-white text-sm ">Phone</p>
                          <p className="text-white text-sm p-0">Blood</p>
                    </div>
                      {donors.map((donor) => (
                        <motion.div
                          key={donor.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          <span className="text-white md:text-sm text-xs">{donor.name}</span>
                          <p className="text-white md:text-sm text-xs md:pr-24"> {donor.phonenumber}</p>
                          <p className="text-white text-xs md:text-sm"> {donor.bloodgroup}</p>
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
  );
}