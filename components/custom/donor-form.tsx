import * as React from "react"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Loader2} from "lucide-react";
import {motion} from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useState } from "react";
export default function DonorForm() {
  const [bloodGroup, setBloodGroup] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [donorAanu, setDonorAanu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBloodSubmission = async () => {
    try{
    setError(null);
      setIsLoading(true);
      const userId = Cookies.get("userId");
      const url = "api/donor";
      const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bloodGroup, userId }),
      })
      const res = await req.json();
      if (!req.ok) {
        setError("Blood group not added");
        return;
      }
      void res;
      Cookies.set("donor", "yes");
      setDonorAanu(true)
      window.location.reload()
    }catch(error){
      setError("Blood group not addded");
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  const handleChangeBlood = (value:string) => {
    setBloodGroup(value);
  }

  return (

    <Dialog>
    <DialogTrigger asChild>
      {!donorAanu && (
        <div className="mt-8">
        <InteractiveHoverButton className="md:text-inherit text-sm">
          Become a Donor
        </InteractiveHoverButton>
      </div>
      )}
    </DialogTrigger>
    <DialogContent className="bg-gray-800/40 border-gray-700/30 backdrop-blur-sm shadow-lg md:w-auto w-[90vw]">
      <DialogHeader>
        {error && <p className="text-red-500">{error}</p>}
        <DialogTitle className="text-white text-center mb-3">Select Blood Group</DialogTitle>
        <DialogDescription className="flex flex-col justify-center items-center gap-5">
        <Select onValueChange={handleChangeBlood} >
      <SelectTrigger className="md:w-[20vw] w-[60vw]">
        <SelectValue placeholder="Select a Blood group" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800/40 border-none backdrop-blur-sm shadow-lg">
        <SelectGroup className="text-white bg-gray-800/40 border-gray-700/30 backdrop-blur-sm shadow-lg border-none">
          <SelectLabel>Blood Group</SelectLabel>
          <SelectItem value="A+">A+</SelectItem>
          <SelectItem value="A-">A-</SelectItem>
          <SelectItem value="B+">B+</SelectItem>
          <SelectItem value="B-">B-</SelectItem>
          <SelectItem value="O+">O+</SelectItem>
          <SelectItem value="O-">O-</SelectItem>
          <SelectItem value="AB+">AB+</SelectItem>
          <SelectItem value="AB-">AB-</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
         <Button className="bg-slate-400 hover:bg-slate-200 border-none text-black" onClick={handleBloodSubmission}>
         {
              isLoading ? (
                <motion.div
                className="flex items-center justify-center"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </motion.div>
              ): (
                "Submit"
              )
            }

         </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>


  )
}