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

import { EditPostDialog } from './EditPostDialog'
import { DeletePostDialog } from './DeletePostDialog'

interface PostsTableProps {
  data: any[]
}

export function PostsTable({ data }: PostsTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Post',
        cell: ({ row }: any) => (
          <div className='flex items-center gap-4'>
            {row.original.thumbnail && (
              <div className='relative w-12 h-12 rounded-lg overflow-hidden'>
                <Image src={row.original.thumbnail} alt={row.original.title} fill className='object-cover' />
              </div>
            )}
            <Typography variant='subtitle2'>{row.original.title}</Typography>
          </div>
        )
      },
      {
        accessorKey: 'visibility',
        header: 'Visibility',
        cell: ({ row }: any) => <Chip label={row.original.visibility} size='small' />
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: any) => (
          <Typography variant='body2'>
            {new Date(row.original.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Typography>
        )
      },
      {
        header: 'Actions',
        cell: ({ row }: any) => (
          <div className='flex gap-2'>
            <IconButton
              size='small'
              onClick={() => {
                setSelectedPost(row.original)
                setEditDialogOpen(true)
              }}
            >
              <Edit size={16} />
            </IconButton>
            <IconButton
              size='small'
              color='error'
              onClick={() => {
                setSelectedPost(row.original)
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
    filterFns: {
      fuzzy: (row, columnId, filterValue) => {
        const value = row.getValue(columnId) as string

        return value.toLowerCase().includes(filterValue.toLowerCase())
      }
    },
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
            placeholder='Search posts...'
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

      <EditPostDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} post={selectedPost} />
      <DeletePostDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        postId={selectedPost?.postId}
      />
    </>
  )
}
