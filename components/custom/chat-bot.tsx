"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageSquareMore, Send, X, Droplet, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your BloodLink assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "You can donate blood if you're at least 17 years old, weigh at least 50kg, and are in good health.",
        "Type O negative blood is considered the universal donor type and can be given to anyone in an emergency.",
        "After donating blood, it's important to rest for 15 minutes, stay hydrated, and avoid heavy lifting for 24 hours.",
        "Blood donation typically takes about 10-15 minutes, but the entire process including registration and health check takes about an hour.",
        "Your blood donation can save up to three lives!",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 text-white md:w-[380px] w-[320px] h-[500px] shadow-2xl shadow-red-900/20"
          >
            <header className="flex justify-between items-center p-4 bg-gradient-to-r from-red-600 to-red-800 shadow-md">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-red-800">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">BloodLink Assistant</h3>
                  <p className="text-xs text-red-100/70">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-red-700/50 rounded-full h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </header>

            <div className="flex flex-col h-[calc(100%-128px)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  {msg.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarFallback className="bg-red-700">
                        <Droplet className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white rounded-tr-none"
                        : "bg-gray-800 text-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] opacity-70 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <footer className="absolute bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm p-4 border-t border-gray-700/30">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus-visible:ring-red-500"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-full shadow-lg shadow-red-900/20 cursor-pointer"
          >
            <MessageSquareMore className="h-6 w-6 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatBot

