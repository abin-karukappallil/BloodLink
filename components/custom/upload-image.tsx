"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Check, X, Loader2 } from "lucide-react"
import Image from "next/image"

export default function ImageUploadButton() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("success")
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
    <div className="flex flex-col  justify-center h-7 items-center gap-4">
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      {!preview ? (
        <button
          type="button"
          onClick={triggerFileInput}
          className="group relative overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/80 p-1 text-white shadow-lg transition-all duration-300 hover:shadow-primary/30 hover:scale-105 active:scale-95"
          disabled={isUploading}
        >
          <div className="flex items-center justify-center gap-2 rounded-full bg-primary px-6">
            <Upload size={18} className="transition-transform group-hover:translate-y-[-2px]" />
            <span className="font-medium text-xs ">Upload</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      ) : (
        <div className="relative">
          <div className="relative overflow-hidden rounded-full h-16 w-16 ring-4 ring-primary/20 shadow-lg transition-all duration-300">
            <Image src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
          </div>

          <div className="absolute -bottom-2 -right-2 flex gap-1">
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
              <Upload size={14} />
            </button>
          </div>
        </div>
      )}

      {uploadStatus === "success" && (
        <p className="text-sm text-green-500 font-medium animate-fadeIn">Upload successful!</p>
      )}

      {uploadStatus === "error" && (
        <p className="text-sm text-red-500 font-medium animate-fadeIn">Upload failed. Please try again.</p>
      )}
    </div>
  )
}

