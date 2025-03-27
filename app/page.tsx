"use client"
import SelectionTab from "@/components/custom/tabs";
import Hero from "@/components/custom/hero";
import { ChatBot } from "@/components/custom/chat-bot";
import Cookies from "js-cookie";
import LandingPage from "@/components/custom/home"
import Loading from "@/components/custom/loading";
import React , {useState,useEffect} from "react"
export default function BloodDonorSystem() {
    const token = Cookies.get("token");
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <Loading />;
}
  if(!token){
    return(
      <LandingPage />
    )
  }
  return (
        <>
         <div className=" bg-gradient-to-br from-gray-950 via-gray-900 to-red-950  text-gray-100">
        <Hero/>
        <SelectionTab />
        <ChatBot />
        </div>
    </>
  );
}