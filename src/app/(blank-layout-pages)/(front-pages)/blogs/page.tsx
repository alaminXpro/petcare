'use client'
import { useEffect, useState, useRef } from 'react'

import Link from 'next/link'

// Hook Imports

import axios from 'axios'
import { Card, CardContent, CardMedia, Typography, Skeleton, Chip, Container, Box } from '@mui/material'
import { CalendarMonth } from '@mui/icons-material'

import { useIntersection } from '@/hooks/useIntersection'

interface Blog {
  postId: string
  title: string
  content: string
  thumbnail: string
  tags: string[]
  created_at: string
}

const BlogCard = ({ blog }: { blog: Blog }) => (
  <Link href={`/blogs/${blog.postId}`}>
    <Card className='h-full hover:shadow-xl transition-shadow duration-300'>
      <CardMedia
        component='img'
        height='200'
        image={blog.thumbnail || '/default-blog.jpg'}
        alt={blog.title}
        className='h-48 object-cover'
      />
      <CardContent className='space-y-3'>
        <Typography variant='h6' className='line-clamp-2 font-bold'>
          {blog.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' className='line-clamp-3'>
          {blog.content}
        </Typography>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <CalendarMonth fontSize='small' />
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <div className='flex flex-wrap gap-2'>{blog.tags?.map(tag => <Chip key={tag} label={tag} size='small' />)}</div>
      </CardContent>
    </Card>
  </Link>
)

const LoadingSkeleton = () => (
  <Card className='h-full'>
    <Skeleton variant='rectangular' height={200} />
    <CardContent>
      <Skeleton variant='text' height={32} />
      <Skeleton variant='text' height={20} />
      <Skeleton variant='text' height={20} />
      <Skeleton variant='text' height={20} />
      <Box sx={{ mt: 2 }}>
        <Skeleton variant='rectangular' width={100} height={32} />
      </Box>
    </CardContent>
  </Card>
)

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs')

        setBlogs(response.data)
      } catch (error) {
        setError('Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container id='blogs' maxWidth='lg' className='py-8' ref={ref}>
      <Typography variant='h4' component='h1' className='mb-8 font-bold text-center'>
        Our Latest Blog Posts
      </Typography>

      {error && (
        <Typography color='error' className='text-center'>
          {error}
        </Typography>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading
          ? Array(6)
              .fill(null)
              .map((_, i) => <LoadingSkeleton key={i} />)
          : blogs.map(blog => <BlogCard key={blog.postId} blog={blog} />)}
      </div>
    </Container>
  )
}

export default Blogs
