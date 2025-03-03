"use client"
import React, { useState } from 'react'
import { MessageSquareMore, Send } from "lucide-react"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
export const ChatBot = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='fixed bottom-4 right-4'>

            {open ? (
                <div className='relative rounded-md bg-gradient-to-br from-slate-900/90 to-red-600/90 text-white md:w-[20vw] h-[60vh] md:h-[80vh]'>
                    <header className='flex flex-col justify-center items-center p-6 text-xl md:text-2xl font-mono'>
                        Chat with your assistant
                    </header>
                    <footer className=" gap-3 absolute bottom-0 bg-red-500/50 p-2 shadow-md flex items-center w-full">
                        <Input
                            placeholder="Enter a message..."
                            type="text"
                            className="text-grey-200 bg-slate-900/40 focus:border-none w-full rounded-md p-2"
                        />
                        <Button
                        className='bg-slate-900/35 w-11'
                        ><Send size={28} color="#ffffff" /></Button>
                    </footer>

                </div>
            ) :
                <MessageSquareMore
                    onClick={() => setOpen(true)}
                    size={48} color="#8c6e6e" />}
        </div>
    )
}