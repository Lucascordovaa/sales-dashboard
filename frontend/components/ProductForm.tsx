"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  brand: z.string().min(1, "Brand is required"),
  category_id: z.string().min(1, "Category is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

export function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  })

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          category_id: Number(data.category_id),
        }),
      })
      if (!res.ok) throw new Error("Failed to create product")
      alert("Product added successfully")
      reset()
    } catch (err) {
      console.error(err)
      alert("Error adding product")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" step="0.01" {...register("price")} />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" {...register("brand")} />
        {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
      </div>

      <div>
        <Label htmlFor="category_id">Category</Label>
        <Select onValueChange={(val) => setValue("category_id", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && (
          <p className="text-sm text-red-500">{errors.category_id.message}</p>
        )}
      </div>

      <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Product"}
      </Button>
    </form>
  )
}
