import SalesEditor from '@/components/SalesEditor'
import { SalesForm } from '@/components/SalesForm'
import { Button } from '@/components/ui/button'
import { UploadSalesCSV } from '@/components/UploadSalesCSV'
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
      
      <div className="p-7 bg-gray-50 rounded-xl space-y-6 mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold">Add/Edit sales</h1>
          <SalesForm/>
          <SalesEditor/>
          <UploadSalesCSV/>
      </div>
    </div>

    
  )
}

export default page