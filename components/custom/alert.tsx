import React, { useEffect, useState } from 'react';
import {motion} from "motion/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {AlertCircle} from "lucide-react";
  import { Badge } from '@/components/ui/badge';
  interface Data {
        id: number,
        content: string,
        hospitalId: number,
        bloodgroup: string,
        units: number,
        date: string,
        status: boolean
  }
function Alerts() {
    const [dataAlert,setDataAlert]=useState([]);
    useEffect(()=>{
        const fetchAlert = async () => {
            const res = await fetch("/api/hospital");
            const data = await res.json();
            setDataAlert(data.data);
            if(!res.ok){
              console.log("errorrrrrr")
            }
          }
          fetchAlert();
    },[])
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
                            <div className="space-y-4">
                            {dataAlert.map((data:Data) => (
                                <motion.div
                                  key={data.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.5 + data.id * 0.1 }}
                                  className={`flex items-start gap-3 p-3 rounded-lg bg-red-800/30`}
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
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
  )
}

export default Alerts