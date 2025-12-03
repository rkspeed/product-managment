import { useDashboard } from "./../../../hooks/useDashboard"
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
import { useTheme } from "./../../../context/theme-provider"
import "./overview.css" 

export function Overview() {
  const { orders } = useDashboard()
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  const axisColor = isDark ? "#cbd5e1" : "#334155"
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"
  const barColor = isDark ? "#4f9cff" : "#1976d2"

  const monthly = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    value: orders
      .filter(o => new Date(o.createdAt).getMonth() === i)
      .reduce((s, o) => s + o.total, 0)
  }))

  return (
    <div className="overview-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthly}>
          <CartesianGrid stroke={gridColor} vertical={false} />

          <XAxis 
            dataKey="month"
            tick={{ fill: axisColor }}
            stroke={axisColor}
          />

          <YAxis 
            tick={{ fill: axisColor }}
            stroke={axisColor}
          />

          <Tooltip 
            contentStyle={{
              background: isDark ? "#0f172a" : "#ffffff",
              border: "1px solid #64748b"
            }}
            labelStyle={{ color: axisColor }}
            itemStyle={{ color: axisColor }}
          />

          <Bar dataKey="value" radius={[4,4,0,0]} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
