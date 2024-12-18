'use client'

import { useState, useMemo } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table'
import { toast } from 'sonner'

import type { Provider, ApprovalStatus } from '@prisma/client'

import { updateProviderStatus } from '@/actions/provider'

type ProviderWithUser = Provider & {
  user: {
    name: string | null
    email: string | null
  }
}

const ProvidersTable = ({ providers }: { providers: ProviderWithUser[] }) => {
  const [data, setData] = useState(providers)

  const columnHelper = createColumnHelper<ProviderWithUser>()

  const columns = useMemo(
    () => [
      columnHelper.accessor(row => row.user.name, {
        id: 'name',
        header: 'Name',
        cell: info => info.getValue() || 'N/A'
      }),
      columnHelper.accessor(row => row.user.email, {
        id: 'email',
        header: 'Email',
        cell: info => info.getValue() || 'N/A'
      }),
      columnHelper.accessor('created_at', {
        header: 'Request Date',
        cell: info => new Date(info.getValue()).toLocaleDateString()
      }),
      columnHelper.accessor('approval_status', {
        header: 'Status',
        cell: info => (
          <FormControl size='small'>
            <Select
              value={info.getValue()}
              onChange={async e => {
                const newStatus = e.target.value as ApprovalStatus
                const result = await updateProviderStatus(info.row.original.userId, newStatus)

                if (result.error) {
                  toast.error(result.error)

                  return
                }

                // Optimistic update
                setData(prev =>
                  prev.map(provider =>
                    provider.userId === info.row.original.userId
                      ? { ...provider, approval_status: newStatus }
                      : provider
                  )
                )

                toast.success('Status updated successfully')
              }}
            >
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
              <MenuItem value='Rejected'>Rejected</MenuItem>
            </Select>
          </FormControl>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: undefined
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
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
  )
}

export default ProvidersTable
