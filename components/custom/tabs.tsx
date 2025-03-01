/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Users, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, AnimatePresence } from "motion/react";
import CountUp from "@/components/ui/count-up";
import Dropdown from "@/components/ui/dropdown";
export default function SelectionTab() {
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [donors, setDonors] = useState<any[]>([]);
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
    return (
        <main className="container mx-auto px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 md:w-full w-full">
                <TabsList className="grid w-full grid-cols-3 md:mt-36 mt-11 gap-4 bg-transparent">
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
                                    <div className="rounded-md border border-gray-700/30 overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-gray-700/30">
                                                <TableRow className="hover:bg-gray-700/40 text-clip border-gray-700/30">
                                                    <TableHead className="text-white font-medium">Name</TableHead>
                                                    <TableHead className="text-white font-medium">Phone</TableHead>
                                                    <TableHead className="text-white font-medium">Blood Group</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {donors.map((donor) => (
                                                    <motion.tr
                                                        key={donor.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                        className="bg-gray-700/20 hover:bg-gray-700/30 border-gray-700/30 transition-colors duration-200"
                                                    >
                                                        <TableCell className="text-white md:text-sm text-xs">{donor.name}</TableCell>
                                                        <TableCell className="text-white md:text-sm text-xs">{donor.phonenumber}</TableCell>
                                                        <TableCell className="text-white md:text-sm text-xs">{donor.bloodgroup}</TableCell>
                                                    </motion.tr>
                                                ))}
                                            </TableBody>
                                        </Table>
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
    )
}