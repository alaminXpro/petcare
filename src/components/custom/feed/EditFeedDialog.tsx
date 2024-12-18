'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, X } from 'lucide-react'
import { CldUploadButton, CldImage } from 'next-cloudinary'

import { FeedValidation, type FeedFormValues } from '@/lib/validations/feed'
import { updateFeed } from '@/app/actions/feed'

interface EditFeedDialogProps {
  feed: Feed
  open: boolean
  onClose: () => void
}

export const EditFeedDialog = ({ feed, open, onClose }: EditFeedDialogProps) => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(feed.images || [])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FeedFormValues>({
    resolver: zodResolver(FeedValidation),
    defaultValues: {
      content: feed.content,
      visibility: feed.visibility,
      images: feed.images
    }
  })

  const { control, handleSubmit } = form

  const handleImageUpload = (result: any) => {
    if (result.event === 'success') {
      setImages(prev => [...prev, result.info.secure_url].slice(0, 3))
    }
  }

  const onSubmit = async (data: FeedFormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append('feedId', feed.feedId.toString()) // Changed from feed.id to feed.feedId
      formData.append('content', data.content)
      formData.append('visibility', data.visibility)
      images.forEach(image => formData.append('images[]', image))

      const response = await updateFeed(formData)

      if (response.error) {
        throw new Error(response.error)
      }

      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className='mb-4'
              />
            )}
          />

          {/* Image Preview Section */}
          {images.length > 0 && (
            <div
              className={`mt-3 grid gap-2 ${
                images.length === 1
                  ? 'grid-cols-1'
                  : images.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              }`}
            >
              {images.map((img, idx) => (
                <div key={idx} className='relative aspect-[4/3]'>
                  <CldImage
                    width={300}
                    height={300}
                    src={img}
                    alt={`Upload ${idx + 1}`}
                    className='rounded-lg object-cover w-full h-48 sm:h-56 md:h-64'
                  />
                  <IconButton
                    size='small'
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className='absolute top-2 right-2 bg-black/50 hover:bg-black/70'
                  >
                    <X className='text-white' size={18} />
                  </IconButton>
                </div>
              ))}
            </div>
          )}

          <div className='flex items-center gap-4 mt-4'>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onUpload={handleImageUpload}
              options={{
                maxFiles: 3,
                resourceType: 'image',
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
              }}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                images.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={images.length >= 3}
            >
              <ImagePlus size={24} className='text-primary' />
            </CldUploadButton>

            <Controller
              name='visibility'
              control={control}
              render={({ field }) => (
                <Select {...field} size='small' className='w-32'>
                  <MenuItem value='Public'>Public</MenuItem>
                  <MenuItem value='Private'>Private</MenuItem>
                </Select>
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={isLoading}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
