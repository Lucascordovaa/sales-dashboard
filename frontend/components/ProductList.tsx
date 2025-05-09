"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Product {
  id: number
  name: string
  category_name: string
  price: number
}

interface Category {
  id: number
  name: string
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/products"),
        fetch("http://127.0.0.1:8000/categories"),
      ])
      const [productsData, categoriesData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    }

    fetchData()
  }, [])

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category_name === selectedCategory)

  return (
    <div className="rounded-md border p-4">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by category:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category_name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
