import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"

interface Props {
  title: string
  value: string | number
  desc?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, desc, icon }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </CardContent>
    </Card>
  )
}
