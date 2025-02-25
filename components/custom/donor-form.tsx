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

export default function DonorForm() {

  const [bloodGroup, setBloodGroup] = React.useState<string>("");

  const handleBloodSubmission = () => {
    //add to db with and hide if user in session has blood submission in db
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