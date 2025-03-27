/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import {motion} from "motion/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { toast } from "sonner"
  import {AlertCircle,Loader2} from "lucide-react";
  import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import Cookies from "js-cookie";
import Loading from '@/components/custom/loading';
  interface Data {
        id: number,
        content: string,
        hospitalId: number,
        bloodgroup: string,
        units: number,
        date: string,
        scheduled: boolean
  }
  
  function Alerts() {
    const [dataAlert,setDataAlert]=useState([]);
    const [donor, setDonor] = useState(Cookies.get("donor") === "yes");
    const userId = Cookies.get("userId");
    const [loading, setLoading] = useState(true);
    const fetchAlert = async () => {
      setLoading(true)
      const res = await fetch("/api/hospital");
      const data = await res.json();
      setDataAlert(data.data);
      if(!res.ok){
        console.log("errorrrrrr")
      }
      setLoading(false)
    }
    useEffect(()=>{
        fetchAlert();
        console.log(donor)
  },[])
    const scheduleDonation= async(id:number)=>{
        try{
            setLoading(true);
            const res = await fetch("/api/schedule",{
                method:"POST",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify({id,userId})
            })
            if(!res.ok){
              toast.error("Error while schedulingg please try again..",{
                richColors: true
              })
                return;
            }
            const result = await res.json();
            toast.success(result.message,{
              richColors: true
            })
            fetchAlert();
        }catch(e){
            console.log(e);
            setLoading(false);
        }
    }


  return (
        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Card className="bg-gray-900/70 border-gray-800/30 backdrop-blur-sm shadow-lg overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Recent Alerts</CardTitle>
                          <CardDescription className="text-gray-400">
                            Latest updates from the blood donation network
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                       {loading ? (
                        <Loading/>
                       ):(
                        
                          <div className="space-y-4">
                          {dataAlert.map((data:Data) => (
                              <motion.div
                                key={data.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + data.id * 0.1 }}
                                className={`md:flex md:items-start flex flex-col md:flex-row gap-3 p-3 rounded-lg bg-red-800/30`}
                              >
                                <div className={`p-2 rounded-full bg-gray-700/50`}>
                                  <AlertCircle
                                    className="h-4 w-4 text-gray-400"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-200">{data.content}</p>
                                  <p className="text-xs text-gray-400 mt-1">{data.date.split("T")[0]}</p>
                                </div>
                                  <Badge
                                    variant="secondary"
                                    className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                                  >
                                    {data.bloodgroup}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                                  >
                                   units: {data.units}
                                  </Badge>
                                 {donor ? data.scheduled ? (
                                      <Badge
                                      variant="secondary"
                                      className="bg-green-500/20 text-gray-300 hover:bg-green-500/30 border border-green-500/30"
                                    >Scheduled</Badge>
                                  ) : (
                                  <Button size="sm" onClick={() => {scheduleDonation(data.id)}}>{loading ?
                                    <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Schedule
                                  </>
                                  :"Schedule"}</Button>
                                  ):""}
                              </motion.div>
                            ))}
                          </div>
                       
                       )}
                        </CardContent>
                        </Card>
                      </motion.div>
  )
}

export default Alerts