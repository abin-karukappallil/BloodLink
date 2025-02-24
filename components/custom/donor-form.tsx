import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DonorForm() {
  return (
    <Select>
      <SelectTrigger className="w-[20vw]">
        <SelectValue placeholder="Select a Blood group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-white bg-black">
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
  )
}