import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MonthlyProfitChart from "@/components/MonthlyProfitChart"
import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExportButtons } from "@/components/ExportButtons"
import SalesChart from "@/components/SalesChart"

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 overflow-hidden">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            <Link href="/add-products">
              <Button className="cursor-pointer">
                <span>Add product</span>
              </Button>
            </Link>

            <Link href="/register-category">
              <Button className="cursor-pointer">
                <span>Add Category</span>
              </Button>
            </Link>

            <Link href="/edit-sales">
              <Button className="cursor-pointer">
                <span>Add/Edit Sales</span>
              </Button>
            </Link>

            <ExportButtons />
          </div>

          <div className="md:hidden relative">
            <details className="relative">
              <summary className="cursor-pointer px-4 py-2 border rounded-md bg-gray-100">Menu</summary>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10 flex flex-col gap-2 p-2">
                <Link href="/add-products">
                  <Button className="w-full">Add product</Button>
                </Link>
                <Link href="/register-category">
                  <Button className="w-full">Add Category</Button>
                </Link>
                <Link href="/edit-sales">
                  <Button className="w-full">Add/Edit Sales</Button>
                </Link>
                <ExportButtons />
              </div>
            </details>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyProfitChart />
          </CardContent>
        </Card>
      </div>

      <div>
        <ProductList />
      </div>

    </main>
  )
}
