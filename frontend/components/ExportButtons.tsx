"use client"

import { Button } from "@/components/ui/button"

export function ExportButtons() {
  const FIELD_MAP = {
    products: ["id", "name", "description", "price", "category_id", "brand"],
    sales: ["id", "product_id", "quantity", "total_price", "date"],
  }

  const downloadCSV = async (type: "products" | "sales") => {
    const endpoint = type === "products" ? "/products" : "/sales"
    const filename = type + ".csv"
    const fields = FIELD_MAP[type]

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`)
      if (!res.ok) throw new Error("Failed to fetch data")
      const data = await res.json()

      if (data.length === 0) {
        alert("No data to export.")
        return
      }

      const csvRows = [
        fields.join(","),
        ...data.map((row: any) =>
          fields.map(field => `"${String(row[field] ?? "").replace(/"/g, '""')}"`).join(",")
        ),
      ]

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert("Failed to export CSV")
    }
  }

  return (
    <div className="lg:space-x-4 space-y-2 lg:space-y-0 flex flex-col lg:flex-row">
      <Button className="cursor-pointer" onClick={() => downloadCSV("products")}>Download Products CSV</Button>
      <Button className="cursor-pointer" onClick={() => downloadCSV("sales")}>Download Sales CSV</Button>
    </div>
  )
}
