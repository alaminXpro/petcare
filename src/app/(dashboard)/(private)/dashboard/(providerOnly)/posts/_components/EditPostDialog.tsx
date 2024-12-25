'use client'

import { useState, useEffect } from 'react' // Add useEffect import

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  FormHelperText,
  Chip,
  IconButton,
  Typography
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { X as XIcon } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import { postFormSchema, type PostFormValues } from '@/lib/validations/post'
import { updatePost } from '@/app/actions/post' // Add this import

interface EditPostDialogProps {
  open: boolean
  onClose: () => void
  post: any // We'll keep this as any for now since it comes from the database
}

export function EditPostDialog({ open, onClose, post }: EditPostDialogProps) {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      visibility: 'Public',
      tags: [],
      thumbnail: undefined
    }
  })

  // Add useEffect to handle post data initialization
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        visibility: post.visibility,
        tags: post.tags || [],
        thumbnail: post.thumbnail
      })
    }
  }, [post, reset])

  const onSubmit = async (data: PostFormValues) => {
    if (!post?.postId) {
      toast.error('Post ID is missing')

      return
    }

    setLoading(true)

    try {
      const result = await updatePost({ ...data, postId: post.postId })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Post updated successfully')
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.target as HTMLInputElement
      const value = input.value.trim()

      if (value) {
        const currentTags = watch('tags')

        setValue('tags', [...currentTags, value])
        input.value = ''
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = watch('tags')

    setValue(
      'tags',
      currentTags.filter(tag => tag !== tagToRemove)
    )
  }

  const handleThumbnailUpload = (result: any) => {
    try {
      if (result?.info?.secure_url) {
        setValue('thumbnail', result.info.secure_url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload thumbnail')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Post Title'
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name='content'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={8}
                label='Content'
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />

          <Controller
            name='visibility'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label='Visibility'
                error={!!errors.visibility}
                helperText={errors.visibility?.message}
              >
                <MenuItem value='Public'>Public</MenuItem>
                <MenuItem value='Private'>Private</MenuItem>
              </TextField>
            )}
          />

          <div>
            <Typography variant='subtitle2' className='mb-2'>
              Thumbnail
            </Typography>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  options={{
                    maxFiles: 1,
                    resourceType: 'image',
                    clientAllowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
                    maxFileSize: 2000000
                  }}
                  onUpload={handleThumbnailUpload}
                >
                  {({ open }) => (
                    <Button variant='contained' onClick={() => open()} disabled={loading}>
                      Upload Thumbnail
                    </Button>
                  )}
                </CldUploadWidget>

                <Typography variant='body2' color='textSecondary'>
                  or
                </Typography>

                <TextField
                  fullWidth
                  placeholder='Paste image URL'
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const input = e.target as HTMLInputElement
                      const value = input.value.trim()

                      if (value) {
                        setValue('thumbnail', value)
                        input.value = ''
                      }
                    }
                  }}
                  disabled={loading}
                  helperText='Enter image URL and press Enter'
                />
              </div>

              {watch('thumbnail') && (
                <div className='relative aspect-video'>
                  <img src={watch('thumbnail')} alt='Thumbnail' className='w-full h-full object-cover rounded-lg' />
                  <IconButton
                    size='small'
                    onClick={() => setValue('thumbnail', undefined)}
                    className='absolute top-2 right-2 bg-black/50 hover:bg-black/70'
                  >
                    <XIcon className='text-white' size={18} />
                  </IconButton>
                </div>
              )}
            </div>
          </div>

          <Controller
            name='tags'
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.tags} fullWidth>
                <TextField label='Add tags' onKeyDown={handleAddTag} helperText='Press Enter to add tags' />
                <div className='mt-2 flex flex-wrap gap-2'>
                  {field.value.map((tag, index) => (
                    <Chip key={index} label={tag} onDelete={() => handleRemoveTag(tag)} />
                  ))}
                </div>
                {errors.tags && <FormHelperText>{errors.tags.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            reset() // Reset form when closing
            onClose()
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant='contained' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
