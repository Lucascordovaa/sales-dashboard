"use client"

import { useEffect, useState } from "react"

interface SalesDataPoint {
  month: string
  quantity: number
}

const MONTH_NAMES = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"
]

export default function SalesChart() {
  const [data, setData] = useState<SalesDataPoint[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sales")
      .then((res) => res.json())
      .then((sales) => {
        const monthlyTotals: number[] = Array(12).fill(0)

        sales.forEach((sale: any) => {
          const monthIndex = new Date(sale.date).getMonth()
          monthlyTotals[monthIndex] += sale.quantity
        })

        const formatted = monthlyTotals.map((quantity, index) => ({
          month: MONTH_NAMES[index],
          quantity,
        }))

        setData(formatted)
      })
  }, [])

  const maxQuantity = Math.max(...data.map((d) => d.quantity), 1)

  return (
    <div className="flex items-end justify-between h-48 mt-8">
      {data.map(({ month, quantity }) => {
        const height = (quantity / maxQuantity) * 170
        return (
          <div key={month} className="flex flex-col items-center">
            <span className="text-xs mb-1 text-muted-foreground">{quantity}</span>
            <div
              className="bg-blue-500 w-5 lg:w-8 rounded"
              style={{ height: `${height}px` }}
              title={`${quantity} sales`}
            />
            <span className="text-xs lg:text-sm mt-1">{month}</span>
          </div>
        )
      })}
    </div>
  )
}
