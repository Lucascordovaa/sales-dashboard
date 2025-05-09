import React from "react"
import { ProductForm } from "@/components/ProductForm"
import { UploadProductCSV } from "@/components/UploadProductCSV"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
  return (
    <div className="w-full h-full">
      <Link href="/">
        <Button className="m-6 cursor-pointer">
          <span>Return to dashboard</span>
        </Button>
      </Link>

      <div className="p-7 bg-gray-50 rounded-xl space-y-6 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <ProductForm />
        <UploadProductCSV />
      </div>
    </div>

  )
}

export default Page
