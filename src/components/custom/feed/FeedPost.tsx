'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Eye, EyeOff, Edit } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { IconButton, Card, CardContent, Typography, Avatar } from '@mui/material'

import { formatDistanceToNow } from 'date-fns'

import { EditFeedDialog } from './EditFeedDialog'

import type { Feed } from '@/types/feed'

interface FeedPostProps {
  feed: Feed
}

export const FeedPost = ({ feed }: FeedPostProps) => {
  const { data: session } = useSession()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const isAuthor = session?.user?.id === feed.authorId

  return (
    <Card className='mb-4'>
      <CardContent>
        <div className='flex flex-col sm:flex-row items-start justify-between'>
          <div className='flex items-start space-x-3 w-full'>
            <Avatar
              src={feed.author.image || '/default-avatar.png'}
              alt={feed.author.name || 'User'}
              className='w-12 h-12 flex-shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col sm:flex-row sm:items-center flex-wrap gap-2'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <Typography variant='subtitle1' component='span' className='font-bold'>
                    {feed.author.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='span' className='break-all'>
                    {feed.author.email}
                  </Typography>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <Typography variant='body2' color='textSecondary' component='span'>
                    {formatDistanceToNow(new Date(feed.created_at), { addSuffix: true })}
                  </Typography>
                  <div className='flex items-center gap-1'>
                    {feed.visibility === 'Private' ? (
                      <EyeOff size={16} className='text-gray-500' />
                    ) : (
                      <Eye size={16} className='text-gray-500' />
                    )}
                    <Typography variant='body2' color='textSecondary' component='span'>
                      {feed.visibility}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography variant='body1' className='mt-2'>
                {feed.content}
              </Typography>
              {feed.images && feed.images.length > 0 && (
                <div
                  className={`mt-3 grid gap-2 ${
                    feed.images.length === 1
                      ? 'grid-cols-1'
                      : feed.images.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                  }`}
                >
                  {feed.images.slice(0, 3).map((image, index) => (
                    <div key={index} className='relative aspect-video'>
                      <Image src={image} alt={`Feed image ${index + 1}`} fill className='rounded-lg object-cover' />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {isAuthor && (
            <IconButton onClick={() => setIsEditDialogOpen(true)} size='small' className='mt-2 sm:mt-0'>
              <Edit size={20} />
            </IconButton>
          )}
        </div>
      </CardContent>

      <EditFeedDialog feed={feed} open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} />
    </Card>
  )
}
