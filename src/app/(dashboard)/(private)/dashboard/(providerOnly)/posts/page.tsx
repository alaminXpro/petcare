import Link from 'next/link'

import { Button, Typography } from '@mui/material'
import { Plus } from 'lucide-react'

import { getPosts } from '@/app/actions/post'
import { PostsTable } from './_components/PostsTable'

export default async function Posts() {
  const result = await getPosts()

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mb-1'>
            Blog Posts
          </Typography>
          <Typography>Manage your blog posts</Typography>
        </div>
        <Button variant='contained' component={Link} href='/dashboard/posts/add' startIcon={<Plus size={16} />}>
          Add New Post
        </Button>
      </div>

      {!result.success ? (
        <div className='p-6 text-center'>
          <Typography color='error'>{result.error}</Typography>
        </div>
      ) : (
        <PostsTable data={result.data} />
      )}
    </div>
  )
}
