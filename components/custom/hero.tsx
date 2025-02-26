"use client"
import { useEffect, useState, useCallback} from 'react'
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import DonorForm from "@/components/custom/donor-form";

function Hero() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState();
  const router = useRouter();
  const [isDonor, setIsDonor] = useState(false);

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
const isDonorCheck = () => {
  const donor = localStorage.getItem("donor");
  setIsDonor(donor === "yes"); 
};
const logout = () => {
  localStorage.clear();
  router.push("/login");
}
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
   <>
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

      <main className="container mx-auto mt-20 px-6">
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
          {isDonor ? (
          <h2 className="text-xl mt-6 font-bold opacity-30">BLOOD DONOR</h2>
          ) :(<p className="text-xl mt-6 flex items-center justify-center text-gray-100">Connecting donors with those in need</p>)}
          
         { !isDonor && <DonorForm />}
         </motion.section>
         </main>
         </>
  )
}

export default Hero;