import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./../../store"
import { fetchOrders } from "./../orders/ordersSlice"
import { fetchProducts } from "./../products/productSlice"

import { Header } from "./../../components/layout/header"
import { Main } from "./../../components/layout/main"
import { ProfileDropdown } from "./../../components/profile-dropdown"
import { ThemeSwitch } from "./../../components/theme-switch"
import { Search } from "./../../components/search"
import { Tabs, TabsContent } from "./../../components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "./../../components/ui/card"

import { useDashboard } from "./../../hooks/useDashboard"
import { StatCard } from "./components/state-card"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { totalProducts, totalSales, totalUsers, activeOrders } = useDashboard()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <>
      <Header>
        <div className="ms-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Products" value={totalProducts} desc="+20% from last month" />
              <StatCard title="Total Users" value={totalUsers} desc="+180% from last month" />
              <StatCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} desc="+19% from last month" />
              <StatCard title="Active Orders" value={activeOrders} desc="+201 since last hour" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                <CardContent><Overview /></CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
