import { useSelector } from "react-redux"
import type { RootState } from "./../store"

export function useDashboard() {
  const { data: products } = useSelector((s: RootState) => s.products)
  const { data: orders } = useSelector((s: RootState) => s.orders)

  const totalProducts = products.length
  const activeProducts = products.filter(p => p.status === "active").length

  const totalUsers = 2350 // static example
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0)
  const activeOrders = orders.filter(o => o.status === "Pending").length

  return {
    totalProducts,
    activeProducts,
    totalUsers,
    totalSales,
    activeOrders,
    products,
    orders
  }
}
