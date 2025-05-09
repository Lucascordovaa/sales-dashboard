"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export function CategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  })

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to create category")
      alert("Category added successfully")
      reset()
    } catch (err) {
      console.error(err)
      alert("Something went wrong while adding the category")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Category"}
      </Button>
    </form>
  )
}
