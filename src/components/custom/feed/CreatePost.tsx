'use client'

import { useState, useRef } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ImagePlus, X } from 'lucide-react'
import { Card, CardContent, TextField, Button, Select, MenuItem, IconButton } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CldUploadButton, CldImage } from 'next-cloudinary'

import { FeedValidation, type FeedFormValues } from '@/lib/validations/feed'
import { createFeed } from '@/app/actions/feed'

export const CreatePost = () => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FeedFormValues>({
    resolver: zodResolver(FeedValidation),
    defaultValues: {
      content: '',
      visibility: 'Public',
      images: []
    }
  })

  const { control, handleSubmit, reset } = form

  const handleImageUpload = (result: any) => {
    if (result.event === 'success') {
      setImages(prev => [...prev, result.info.secure_url].slice(0, 3))
    }
  }

  const onSubmit = async (data: FeedFormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append('content', data.content)
      formData.append('visibility', data.visibility)
      images.forEach(image => formData.append('images[]', image))

      await createFeed(formData)
      reset()
      setImages([])
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mb-4'>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                placeholder="What's happening?"
                variant='outlined'
                className='mb-4'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

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

          <div className='mt-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
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
            <Button type='submit' variant='contained' disabled={isLoading}>
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
