'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import axios from 'axios'
import { Container, Typography, Chip, Skeleton, Box, Divider, Paper } from '@mui/material'
import { CalendarMonth, Person } from '@mui/icons-material'

interface Blog {
  postId: number
  title: string
  content: string
  thumbnail: string
  tags: string[]
  created_at: string
  author: {
    user: {
      name: string
    }
  }
}

const BlogDetails = () => {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${params.id}`)

        setBlog(response.data)
      } catch (error) {
        setError('Failed to fetch blog details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  if (loading) {
    return (
      <Container maxWidth='lg' className='py-8'>
        <Skeleton variant='rectangular' height={400} />
        <Box sx={{ mt: 4 }}>
          <Skeleton variant='text' height={60} />
          <Skeleton variant='text' height={30} />
          <Skeleton variant='text' height={30} />
          <Skeleton variant='rectangular' height={200} sx={{ mt: 4 }} />
        </Box>
      </Container>
    )
  }

  if (error || !blog) {
    return (
      <Container maxWidth='lg' className='py-8'>
        <Typography color='error' className='text-center'>
          {error || 'Blog not found'}
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg' className='py-8'>
      <Paper elevation={0} className='overflow-hidden rounded-xl'>
        <div
          className='h-[400px] w-full bg-cover bg-center'
          style={{
            backgroundImage: `url(${blog.thumbnail || '/default-blog.jpg'})`
          }}
        />

        <div className='p-8 space-y-6'>
          <Typography variant='h3' component='h1' className='font-bold'>
            {blog.title}
          </Typography>

          <div className='flex flex-wrap gap-4 items-center text-gray-600'>
            <div className='flex items-center gap-2'>
              <Person fontSize='small' />
              <span>{blog.author?.user?.name || 'Anonymous'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <CalendarMonth fontSize='small' />
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>{blog.tags?.map(tag => <Chip key={tag} label={tag} />)}</div>

          <Divider />

          <Typography variant='body1' className='whitespace-pre-line leading-relaxed'>
            {blog.content}
          </Typography>
        </div>
      </Paper>
    </Container>
  )
}

export default BlogDetails
