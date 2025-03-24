"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { LogOut} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function HospitalPage() {
  const [alert, setAlert] = useState(false)
  const [error , setError]=useState("");
  const [success,setSuccess]=useState("");
  const [loading,setLoading]=useState(false);
  interface Alert {
    id: string;
    bloodgroup: string;
    content: string;
    units: number;
    date: string;
  }
  const [dataAlert, setDataAlert] = useState<Alert[]>([]);
  const [l,setL]=useState(false);
  const formRef = useRef<HTMLFormElement>(null)
  
    useEffect(()=>{
      const fetchAlert = async () => {
        setL(true);
        try{
        const res = await fetch("/api/hospital");
        const data = await res.json();
        setDataAlert(data.data);
        if(!res.ok){
          console.log("errorrrrrr")
        }}catch(e){
          void(e);
        }finally{
          setL(false);
        }


      }
      fetchAlert();
    }, [])

  
  const logOut = () => {
    Cookies.remove("token")
    Cookies.remove("hospital")
    Cookies.remove("hosId")
    window.location.href = "/"
  }
  
  interface FormFields {
    content: FormDataEntryValue | null
    bloodgroup: FormDataEntryValue | null
    units: FormDataEntryValue | null
    date: FormDataEntryValue | null
    hospitalId: string
  }
  const hosId = Cookies.get("hosId")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    e.preventDefault()
    if (formRef.current) {
      const form = new FormData(formRef.current)
      const formFields: FormFields = {
        content: form.get('content'),
        bloodgroup: form.get('bloodType'),
        units: form.get('quantity'),
        hospitalId: hosId || "",
        date: form.get('expiryDate')
      }
      console.log(formFields)
     try{
      const res = await fetch("/api/hospital", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formFields)
      })
      if(!res.ok){
        setError("Error in adding alert please try anagin later");
        return;
      }
      setSuccess("Successfully Added Alert");
      setAlert(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      window.location.reload();
     }catch(e){
      console.log(e);
     }finally{
      setLoading(false);
     }

    }
  }
  
  return (
    <div className="flex h-screen text-white overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <motion.div 
          className="bg-slate-800 p-4 flex justify-between items-center shadow-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Hospital Admin Panel</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={logOut} className="p-2 rounded-full hover:bg-slate-700 relative">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">City Hospital</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="p-6">
          <div className='flex flex-col justify-center items-start p-4 '>
          <Button onClick={()=>setAlert(!alert)}>{alert ? "Close Alert":"Add Alert"}</Button>
         
          </div>
           {error && (
            <div className='bg-red-900/50  m-10 rounded'>
              <p className='p-5 text-red-400'>{error}</p>
            </div>
          )}
          {success && (
            <div className='bg-green-900/50 m-10 rounded'>
              <p className='p-5 text-green-400'>{success}</p>
            </div>
          )}
               {alert && (
                 <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="mb-8"
               >
                 <Card className="bg-slate-800/20 text-gray-200 border-slate-700">
                   <CardHeader>
                     <CardTitle>Post A Blood Need</CardTitle>
                     <CardDescription className="text-slate-400">Create an alert for urgent blood requirements</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                       <div className="space-y-2">
                         <Label htmlFor="content">Alert Message</Label>
                         <Textarea 
                           id="content" 
                           name="content" 
                           placeholder="Eg: Need O+ blood urgently for surgery patient" 
                           className="bg-slate-900/50 border-slate-600"
                           required
                         />
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="space-y-2">
                           <Label htmlFor="bloodType">Blood Type</Label>
                           <Select name="bloodType" defaultValue="">
                             <SelectTrigger className="bg-slate-900/50 border-slate-600">
                               <SelectValue placeholder="Select blood type" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="A+">A+</SelectItem>
                               <SelectItem value="A-">A-</SelectItem>
                               <SelectItem value="B+">B+</SelectItem>
                               <SelectItem value="B-">B-</SelectItem>
                               <SelectItem value="AB+">AB+</SelectItem>
                               <SelectItem value="AB-">AB-</SelectItem>
                               <SelectItem value="O+">O+</SelectItem>
                               <SelectItem value="O-">O-</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="quantity">Units Required</Label>
                           <Input 
                             type="number" 
                             id="quantity" 
                             name="quantity" 
                             min="1"
                             placeholder="Number of units" 
                             className="bg-slate-900/50 border-slate-600"
                             required
                           />
                         </div>
                         
                         <div className="space-y-2">
                           <Label htmlFor="expiryDate">Required By</Label>
                           <Input 
                             type="date" 
                             id="expiryDate" 
                             name="expiryDate" 
                             className="bg-slate-900/50 border-slate-600"
                             required
                           />
                         </div>
                       </div>
                       
                       <div className="flex justify-end space-x-3 pt-4">
                          <Button type="submit">{loading ? "Posting.." : "Post Alert"}</Button>
                       </div>
                     </form>
                   </CardContent>
                 </Card>
               </motion.div>
               )}
           
            
           {l ? "loadinggg dataaa...": (
             <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <Card className="bg-slate-800/20 border-slate-700">
               <CardHeader>
                 <CardTitle className='text-red-400'>Active Blood Alerts</CardTitle>
                 <CardDescription className="text-gray-200">Currently active blood requests</CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   {dataAlert.map((alert) => (
                     <motion.div 
                       key={alert.id}
                       whileHover={{ scale: 1.01 }}
                       className={`p-4 rounded-lg border-l-4 border-l-yellow-600 bg-slate-700/20`}
                     >
                       <div className="flex justify-between">
                         <div className="flex items-center">
                          
                           <Badge variant="outline" className="border-red-500 text-gray-200">
                             {alert.bloodgroup}
                           </Badge>
                         </div>
                         <span className="text-xs text-gray-200">{alert.date.split("T")[0]}</span>
                       </div>
                       <p className="mt-2 text-lg font-medium text-gray-200">{alert.content}</p>
                       <div className="mt-3 flex justify-between items-center">
                         <div className="flex items-center space-x-4">
                          
                           <div className="text-sm">
                             <span className="text-slate-500">Units: </span>
                             <span className='text-gray-200'>{alert.units}</span>
                           </div>
                         </div>
                         <div className="flex space-x-2">
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </motion.div>
           )}
         
          
    
        </div>
      </div>
    </div>
  )
}

export default HospitalPage
