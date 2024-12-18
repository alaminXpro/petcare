'use client'

import { useState, useMemo } from 'react'

import Image from 'next/image'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TextField,
  TablePagination,
  IconButton,
  Box,
  Typography,
  Chip
} from '@mui/material'
import { ArrowUpDown, Edit, Trash } from 'lucide-react'

import { EditServiceDialog } from './EditServiceDialog'
import { DeleteServiceDialog } from './DeleteServiceDialog'

interface ServicesTableProps {
  data: any[]
}

export function ServicesTable({ data }: ServicesTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Service',
        cell: ({ row }: any) => (
          <div className='flex items-center gap-4'>
            <div className='relative w-12 h-12 rounded-lg overflow-hidden'>
              <Image
                src={row.original.images[0] || '/placeholder.png'}
                alt={row.original.title}
                fill
                className='object-cover'
              />
            </div>
            <div>
              <Typography variant='subtitle2'>{row.original.title}</Typography>
              <Typography variant='caption' color='textSecondary'>
                {row.original.serviceType}
              </Typography>
            </div>
          </div>
        )
      },
      {
        accessorKey: 'serviceType',
        header: 'Type',
        cell: ({ row }: any) => <Chip label={row.original.serviceType} size='small' />
      },
      {
        accessorKey: 'priceAmount',
        header: 'Price',
        cell: ({ row }: any) => (
          <Typography>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: row.original.priceCurrency
            }).format(row.original.priceAmount)}
          </Typography>
        )
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => (
          <Chip
            label={row.original.status}
            color={row.original.status === 'Active' ? 'success' : 'default'}
            size='small'
          />
        )
      },
      {
        header: 'Actions',
        cell: ({ row }: any) => (
          <div className='flex gap-2'>
            <IconButton
              size='small'
              onClick={() => {
                setSelectedService(row.original)
                setEditDialogOpen(true)
              }}
            >
              <Edit size={16} />
            </IconButton>
            <IconButton
              size='small'
              color='error'
              onClick={() => {
                setSelectedService(row.original)
                setDeleteDialogOpen(true)
              }}
            >
              <Trash size={16} />
            </IconButton>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <>
      <Paper className='w-full'>
        <Box p={2}>
          <TextField
            fullWidth
            value={table.getState().globalFilter || ''}
            onChange={e => table.setGlobalFilter(e.target.value)}
            placeholder='Search services...'
            size='small'
          />
        </Box>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      <div className='flex items-center gap-2'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && <ArrowUpDown size={16} />}
                      </div>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Paper>

      <EditServiceDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} service={selectedService} />

      <DeleteServiceDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        serviceId={selectedService?.serviceId}
      />
    </>
  )
}
