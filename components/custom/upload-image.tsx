"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Pencil, Check, X, Loader2 } from "lucide-react"
import Image from "next/image"
import Cookies from "js-cookie"
//import { useRouter } from "next/navigation"

export default function PencilUploadButton() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)
  //const router =useRouter();c
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadStatus("idle")
    const file = event.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setIsUploading(true)

    try {
      const userId = Cookies.get("userId")
      if (!userId) {
        setUploadStatus("error");
        setIsUploading(false);
        return;
        
      }
      const formData = new FormData()
      formData.append("image", file)
      console.log(formData);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userId}`,
        },
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("success")
        location.reload();
      } else {
        setUploadStatus("error")
      }
    } catch (error) {
      console.log(error)
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetUpload = () => {
    setPreview(null)
    setUploadStatus("idle")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      {!preview ? (
        <button
          type="button"
          onClick={triggerFileInput}
          className="group relative rounded-full bg-primary p-2 text-white shadow-sm transition-all duration-300 hover:shadow-primary/30 hover:scale-105 active:scale-95"
          disabled={isUploading}
          aria-label="Upload image"
        >
          <Pencil size={16} className="transition-transform group-hover:rotate-12" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      ) : (
        <div className="relative">
          <div className="relative overflow-hidden rounded-full h-10 w-10 ring-2 ring-primary/20 shadow-sm transition-all duration-300">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          </div>

          <div className="absolute -bottom-1 -right-1 flex gap-1 scale-75">
            {isUploading ? (
              <button className="rounded-full bg-primary p-2 text-white shadow-md" disabled>
                <Loader2 size={14} className="animate-spin" />
              </button>
            ) : uploadStatus === "success" ? (
              <button
                className="rounded-full bg-green-500 p-2 text-white shadow-md hover:bg-green-600 transition-colors"
                onClick={resetUpload}
              >
                <Check size={14} />
              </button>
            ) : uploadStatus === "error" ? (
              <button
                className="rounded-full bg-red-500 p-2 text-white shadow-md hover:bg-red-600 transition-colors"
                onClick={resetUpload}
              >
                <X size={14} />
              </button>
            ) : null}

            <button
              className="rounded-full bg-primary p-2 text-white shadow-md hover:bg-primary/90 transition-colors"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              <Pencil size={14} />
            </button>
          </div>
        </div>
      )}

      {uploadStatus === "success" && (
        <span className="ml-2 text-xs text-green-500 font-medium animate-fadeIn">Uploaded!</span>
      )}

      {uploadStatus === "error" && <span className="ml-2 text-xs text-red-500 font-medium animate-fadeIn">Failed</span>}
    </div>
  )
}

