"use client"

import { useEffect, useState } from "react"

interface ProfitDataPoint {
  month: string
  profit: number
}

const MONTH_NAMES = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"
]

export default function MonthlyProfitChart() {
  const [data, setData] = useState<ProfitDataPoint[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sales")
      .then((res) => res.json())
      .then((sales) => {
        const monthlyProfits: number[] = Array(12).fill(0)

        sales.forEach((sale: any) => {
          const monthIndex = new Date(sale.date).getMonth()
          monthlyProfits[monthIndex] += sale.total_price
        })

        const formatted = monthlyProfits.map((profit, index) => ({
          month: MONTH_NAMES[index],
          profit: Number(profit.toFixed(2)),
        }))

        setData(formatted)
      })
  }, [])

  const maxProfit = Math.max(...data.map((d) => d.profit), 1)

  return (
    <div className="flex items-end justify-between h-48 mt-8">
      {data.map(({ month, profit }) => {
        const height = (profit / maxProfit) * 170
        const shortProfit = `${(profit / 1000).toFixed(0)}k`
        return (
          <div key={month} className="flex flex-col items-center">
            <span className="text-xs mb-1 text-muted-foreground hidden md:inline">${profit}</span>
            <span className="text-xs mb-1 text-muted-foreground inline md:hidden">{shortProfit}</span>
            <div
              className="bg-green-500 w-4 lg:w-8 rounded"
              style={{ height: `${height}px` }}
              title={`$${profit}`}
            />
            <span className="text-xs lg:text-sm mt-1">{month}</span>
          </div>
        )
      })}
    </div>
  )
}
