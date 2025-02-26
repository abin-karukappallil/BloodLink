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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function DonorForm() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const handleBloodSubmission = async () => {
    try{
    setError(null);
      const userId = localStorage.getItem("userId");
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
      } else {
        void res;
        localStorage.setItem("donor", "yes");
        router.push('/');
      }
    }catch(error){
      setError("Blood group not addded");
      console.log(error);
    }
  }
  const handleChangeBlood = (value:string) => {
    setBloodGroup(value);
  }
 

  return (

    <Dialog>
    <DialogTrigger asChild>
      <div>
        <InteractiveHoverButton>
          Become a Donor
        </InteractiveHoverButton>
      </div>
    </DialogTrigger>
    <DialogContent className="bg-gray-800/40 border-gray-700/30 backdrop-blur-sm shadow-lg">
      <DialogHeader>
        {error && <p className="text-red-500">{error}</p>}
        <DialogTitle className="text-white text-center mb-3">Select Blood Group</DialogTitle>
        <DialogDescription className="flex flex-col justify-center items-center gap-5">
        <Select onValueChange={handleChangeBlood} >
      <SelectTrigger className="w-[20vw]">
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
          <SelectItem value="AB=">AB-</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
         <Button onClick={handleBloodSubmission}>Submit</Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>


  )
}