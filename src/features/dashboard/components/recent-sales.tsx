import { useDashboard } from "./../../../hooks/useDashboard"

export function RecentSales() {
  const { orders } = useDashboard()

  return (
    <div className="space-y-4">
      {orders.slice(0, 6).map(order => (
        <div key={order.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">{order.product}</p>
          </div>
          <span className="text-green-500 font-semibold">
            +${order.total.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}
