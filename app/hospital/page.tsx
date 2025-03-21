"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
function HospitalPage() {
    const logOut = ()=> {
        Cookies.remove("token");
        Cookies.remove("hospital");
        Cookies.remove("hosId");
    }
  return (
   
    <div>
<div className='flex justify-center items-center h-screen'>
    <Button className='bg-white text-black' onClick={logOut}>LOG OUT</Button>
</div>


    </div>
  )
}

export default HospitalPage