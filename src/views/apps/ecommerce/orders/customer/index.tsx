'use client'
import { useMemo } from 'react'

import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import {
  Box,
  Card,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer
} from '@mui/material'

interface OrderItem {
  id: string
  quantity: number
  product?: {
    name: string
    images: string[]
    brand: string
    supplier: {
      user: {
        name: string
        email: string
      }
    }
  }
  service?: {
    title: string
    images: string[]
    provider: {
      user: {
        name: string
        email: string
      }
    }
  }
}

interface Order {
  id: string
  orderId: string
  delivery_status: string
  total_price: number
  created_at: string
  OrderItems: OrderItem[]
}

interface CustomerOrderListProps {
  orders: Order[]
}

const getStatusColor = (status: string | null | undefined) => {
  if (!status) return 'default'

  switch (status.toLowerCase()) {
    case 'completed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}

const CustomerOrderList = ({ orders }: CustomerOrderListProps) => {
  //console.log('Received orders:', orders) // Debug log

  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('orderId', {
        header: 'Order ID',
        cell: info => info.getValue() || 'N/A'
      }),
      columnHelper.accessor('created_at', {
        header: 'Date',
        cell: info => {
          const date = info.getValue()

          return date ? new Date(date).toLocaleDateString() : 'N/A'
        }
      }),
      columnHelper.accessor('delivery_status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue()

          return <Chip label={status || 'N/A'} color={getStatusColor(status) as any} size='small' />
        }
      }),
      columnHelper.accessor('OrderItems', {
        header: 'Items',
        cell: info => {
          const items = info.getValue()

          if (!items?.length) return 'No items'

          return (
            <Typography variant='body2'>
              {items
                .filter(item => item !== null)
                .map(item => {
                  const name = item.product?.name || item.service?.title

                  return name ? `${item.quantity}x ${name}` : null
                })
                .filter(Boolean)
                .join(', ') || 'No items'}
            </Typography>
          )
        }
      }),
      columnHelper.accessor('total_amount', {
        header: 'Total',
        cell: info => {
          const total = info.getValue()

          //console.log('Total value:', total) // Debug log

          return <Typography>${total ? Number(total).toFixed(2) : '0.00'}</Typography>
        }
      })
    ],
    []
  )

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  if (!orders?.length) {
    return (
      <Card>
        <Box sx={{ p: 4 }}>
          <Typography variant='h6'>My Orders</Typography>
          <Typography sx={{ mt: 2 }}>No orders found.</Typography>
        </Box>
      </Card>
    )
  }

  return (
    <Card>
      <Box sx={{ p: 4 }}>
        <Typography variant='h6'>My Orders</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CustomerOrderList
