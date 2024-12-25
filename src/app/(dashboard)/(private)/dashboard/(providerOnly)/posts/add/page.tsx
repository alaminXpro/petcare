'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

// Icon Imports
import { X as XIcon } from 'lucide-react'

// Form Imports
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

// Cloudinary Import
import { CldUploadWidget } from 'next-cloudinary'

// Local Imports
import { postFormSchema, type PostFormValues } from '@/lib/validations/post'
import { addPost } from '@/app/actions/post'

const PostAdd = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      visibility: 'Public',
      tags: [],
      thumbnail: undefined
    }
  })

  const onSubmit = async (data: PostFormValues) => {
    setLoading(true)
    setError(null)

    try {
      const result = await addPost(data)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Post published successfully')
      router.push('/dashboard/posts')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'

      setError(errorMessage)
      toast.error(errorMessage)
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
          <div>
            <Typography variant='h4' className='mb-1'>
              Add a new blog post
            </Typography>
            <Typography>Share your thoughts and expertise</Typography>
          </div>
          <div className='flex flex-wrap max-sm:flex-col gap-4'>
            <Button variant='outlined' color='secondary' onClick={() => router.back()} disabled={loading}>
              Discard
            </Button>
            <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Publish Post'}
            </Button>
          </div>
        </div>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <Alert severity='error'>{error}</Alert>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title='Post Content' />
          <CardContent className='space-y-4'>
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
                  rows={12}
                  label='Content'
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Post Settings' />
              <CardContent className='space-y-4'>
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

                    <div className='flex items-center gap-2'>
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
                        <img
                          src={watch('thumbnail')}
                          alt='Thumbnail'
                          className='w-full h-full object-cover rounded-lg'
                        />
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PostAdd
