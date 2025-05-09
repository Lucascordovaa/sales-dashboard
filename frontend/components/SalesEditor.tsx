"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

type Sale = {
  id: number
  product_id: number
  quantity: number
  total_price: number
  date: string
}

type Product = {
  id: number
  name: string
}

export default function SalesEditor() {
  const [sales, setSales] = useState<Sale[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [month, setMonth] = useState<string>("")
  const [editingSale, setEditingSale] = useState<Partial<Sale> | null>(null)

  const fetchSales = async () => {
    if (!month) return
    const [year, m] = month.split("-").map(Number)
    const res = await fetch(`http://127.0.0.1:8000/sales/by_month/?month=${m}&year=${year}`)
    const data = await res.json()
    setSales(data)
  }

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products")
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const saveEdit = async () => {
    if (!editingSale) return
    const res = await fetch(`http://127.0.0.1:8000/sales/${editingSale.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingSale),
    })
    if (res.ok) {
      alert("Sale updated!")
      setEditingSale(null)
      fetchSales()
    }
  }

  const getProductName = (id: number) => {
    const product = products.find(p => p.id === id)
    return product?.name || `Product #${id}`
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Label>Select Month</Label>
        <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        <Button onClick={fetchSales}>Load Sales</Button>
      </div>

      {sales.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td>{sale.id}</td>
                <td>
                  {editingSale?.id === sale.id ? (
                    <Input
                      value={editingSale.product_id}
                      onChange={(e) =>
                        setEditingSale({ ...editingSale, product_id: Number(e.target.value) })
                      }
                    />
                  ) : (
                    getProductName(sale.product_id)
                  )}
                </td>
                <td>
                  {editingSale?.id === sale.id ? (
                    <Input
                      value={editingSale.quantity}
                      onChange={(e) =>
                        setEditingSale({ ...editingSale, quantity: Number(e.target.value) })
                      }
                    />
                  ) : (
                    sale.quantity
                  )}
                </td>
                <td>
                  {editingSale?.id === sale.id ? (
                    <Input
                      value={editingSale.total_price}
                      onChange={(e) =>
                        setEditingSale({
                          ...editingSale,
                          total_price: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    sale.total_price
                  )}
                </td>
                <td>
                  {editingSale?.id === sale.id ? (
                    <Input
                      type="date"
                      value={editingSale.date}
                      onChange={(e) =>
                        setEditingSale({ ...editingSale, date: e.target.value })
                      }
                    />
                  ) : (
                    format(new Date(sale.date), "yyyy-MM-dd")
                  )}
                </td>
                <td>
                  {editingSale?.id === sale.id ? (
                    <>
                      <Button onClick={saveEdit}>Save</Button>
                      <Button variant="secondary" onClick={() => setEditingSale(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setEditingSale(sale)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
