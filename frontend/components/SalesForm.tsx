"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const salesSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().int().positive("Quantity must be a positive number"),
  total_price: z.coerce.number().positive("Total price must be positive"),
  date: z.string().min(1, "Date is required"),
})

type SalesFormValues = z.infer<typeof salesSchema>

export function SalesForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SalesFormValues>({
    resolver: zodResolver(salesSchema),
  })

  const [products, setProducts] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const onSubmit = async (data: SalesFormValues) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product_id: Number(data.product_id) }),
      })
      if (!res.ok) throw new Error("POST failed")
      alert("Sale added successfully")
      reset()
    } catch (error) {
      alert("Something went wrong while submitting")
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div>
        <Label htmlFor="product_id">Product</Label>
        <Select onValueChange={(val) => setValue("product_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.product_id && <p className="text-sm text-red-500">{errors.product_id.message}</p>}
      </div>

      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" {...register("quantity")} />
        {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
      </div>

      <div>
        <Label htmlFor="total_price">Total Price</Label>
        <Input id="total_price" type="number" step="0.01" {...register("total_price")} />
        {errors.total_price && <p className="text-sm text-red-500">{errors.total_price.message}</p>}
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Sale"}
      </Button>
    </form>
  )
}
