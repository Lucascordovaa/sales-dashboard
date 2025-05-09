
import { CategoryForm } from '@/components/CategoryForm'
import { Button } from '@/components/ui/button'
import { UploadCategoriesCSV } from '@/components/UploadCategories'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="w-full h-full">
      <Link href="/">
        <Button className="m-6 cursor-pointer">
          <span>Return to dashboard</span>
        </Button>
      </Link>

      <div className="p-7 bg-gray-50 rounded-xl space-y-6 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">Add category</h1>
        <CategoryForm />
        <UploadCategoriesCSV />
      </div>
    </div>
  )
}

export default page