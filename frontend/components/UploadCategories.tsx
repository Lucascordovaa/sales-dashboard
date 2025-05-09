"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function UploadCategoriesCSV() {
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) {
      toast("No file selected")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://127.0.0.1:8000/categories/upload_csv/", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      toast("CSV uploaded successfully")
    } catch (error) {
      toast("Error uploading CSV, please reload the page and try again")
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Upload Categories via CSV</h2>
      <Input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload}>Upload CSV</Button>
    </div>
  )
}
