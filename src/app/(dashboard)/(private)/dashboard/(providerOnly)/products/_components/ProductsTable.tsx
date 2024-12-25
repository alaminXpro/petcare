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
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material'
import { ArrowUpDown, Edit, Trash } from 'lucide-react'

import { ProductType } from '@prisma/client'

import { EditProductDialog } from './EditProductDialog'
import { DeleteProductDialog } from './DeleteProductDialog'

interface ProductsTableProps {
  data: any[]
}

export function ProductsTable({ data }: ProductsTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [productType, setProductType] = useState<ProductType | ''>('')

  const filteredData = useMemo(() => {
    return data.filter(product => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = productType === '' || product.productType === productType

      return matchesSearch && matchesType
    })
  }, [data, searchQuery, productType])

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
    data: filteredData,
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search by name, brand, or tags...'
                size='small'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size='small'>
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={productType}
                  label='Product Type'
                  onChange={e => setProductType(e.target.value as ProductType | '')}
                >
                  <MenuItem value=''>All</MenuItem>
                  {Object.values(ProductType).map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
          count={filteredData.length}
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
