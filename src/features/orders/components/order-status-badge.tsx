import { Chip } from '@mui/material'

export function OrderStatusBadge({ status }: { status: string }) {
  let color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default'

  switch (status) {
    case 'Pending':
      color = 'warning'
      break
    case 'Shipped':
      color = 'primary'
      break
    case 'Delivered':
      color = 'success'
      break
    case 'Cancelled':
      color = 'error'
      break
  }

  return <Chip label={status} color={color} size="small" />
}
