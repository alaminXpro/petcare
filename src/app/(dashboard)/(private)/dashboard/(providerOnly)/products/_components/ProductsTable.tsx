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

import { EditProductDialog } from './EditProductDialog'
import { DeleteProductDialog } from './DeleteProductDialog'

interface ProductsTableProps {
  data: any[]
}

export function ProductsTable({ data }: ProductsTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ row }: any) => (
          <div className='flex items-center gap-4'>
            <div className='relative w-12 h-12 rounded-lg overflow-hidden'>
              <Image
                src={row.original.images[0] || '/placeholder.png'}
                alt={row.original.name}
                fill
                className='object-cover'
              />
            </div>
            <div>
              <Typography variant='subtitle2'>{row.original.name}</Typography>
              <Typography variant='caption' color='textSecondary'>
                {row.original.brand}
              </Typography>
            </div>
          </div>
        )
      },
      {
        accessorKey: 'productType',
        header: 'Type',
        cell: ({ row }: any) => <Chip label={row.original.productType} size='small' />
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
        accessorKey: 'stock',
        header: 'Stock'
      },
      {
        header: 'Actions',
        cell: ({ row }: any) => (
          <div className='flex gap-2'>
            <IconButton
              size='small'
              onClick={() => {
                setSelectedProduct(row.original)
                setEditDialogOpen(true)
              }}
            >
              <Edit size={16} />
            </IconButton>
            <IconButton
              size='small'
              color='error'
              onClick={() => {
                setSelectedProduct(row.original)
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
            placeholder='Search products...'
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

      <EditProductDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} product={selectedProduct} />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        productId={selectedProduct?.productId} // Ensure productId is passed correctly
      />
    </>
  )
}
