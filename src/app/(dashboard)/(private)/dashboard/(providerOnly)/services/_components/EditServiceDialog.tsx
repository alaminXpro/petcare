'use client'

import { useState, useEffect } from 'react'

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
import { CldUploadWidget } from 'next-cloudinary'
import { X as XIcon } from 'lucide-react'

import { serviceFormSchema, type ServiceFormValues } from '@/lib/validations/service'
import { updateService } from '@/app/actions/service'

interface EditServiceDialogProps {
  open: boolean
  onClose: () => void
  service: ServiceFormValues | null
}

export function EditServiceDialog({ open, onClose, service }: EditServiceDialogProps) {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      serviceId: service?.serviceId || 0,
      title: service?.title || '',
      description: service?.description || '',
      serviceType: service?.serviceType || 'Daycare',
      priceCurrency: service?.priceCurrency || 'BDT',
      priceAmount: service?.priceAmount || 0,
      status: service?.status || 'Active',
      tags: service?.tags || [],
      images: service?.images || [],
      locations: service?.locations || {}
    }
  })

  useEffect(() => {
    if (service) {
      reset(service)
    }
  }, [service, reset])

  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true)

    try {
      const result = await updateService({ ...data, serviceId: service?.serviceId })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Service updated successfully')
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
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

  const handleImageUpload = (result: any) => {
    try {
      if (result?.info?.secure_url) {
        const currentImages = watch('images') || []
        const newUrl = result.info.secure_url

        setValue('images', [...currentImages, newUrl].slice(0, 3))
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    }
  }

  const handleImageUrlAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.target as HTMLInputElement
      const url = input.value.trim()

      if (url) {
        const currentImages = watch('images') || []

        if (currentImages.length >= 3) {
          toast.error('Maximum 3 images allowed')

          return
        }

        setValue('images', [...currentImages, url])
        input.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const currentImages = watch('images')

    setValue(
      'images',
      currentImages.filter((_, i) => i !== index)
    )
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Edit Service</DialogTitle>
      <DialogContent dividers className='space-y-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Service Title'
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='Description'
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name='serviceType'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label='Service Type'
                error={!!errors.serviceType}
                helperText={errors.serviceType?.message}
              >
                <MenuItem value='Daycare'>Daycare</MenuItem>
                <MenuItem value='Rescue'>Rescue</MenuItem>
                <MenuItem value='Vet'>Vet</MenuItem>
                <MenuItem value='Adoption'>Adoption</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label='Status'
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </TextField>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <Controller
              name='priceCurrency'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label='Currency'
                  error={!!errors.priceCurrency}
                  helperText={errors.priceCurrency?.message}
                >
                  <MenuItem value='BDT'>BDT</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name='priceAmount'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Price'
                  onChange={e => field.onChange(Number(e.target.value))}
                  error={!!errors.priceAmount}
                  helperText={errors.priceAmount?.message}
                />
              )}
            />
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

          <Controller
            name='images'
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.images} fullWidth>
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
                      onUpload={handleImageUpload}
                    >
                      {({ open }) => (
                        <Button
                          variant='contained'
                          onClick={() => open()}
                          disabled={loading || watch('images')?.length >= 3}
                        >
                          Upload Image
                        </Button>
                      )}
                    </CldUploadWidget>

                    <Typography variant='body2' color='textSecondary'>
                      or
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder='Paste image URL and press Enter'
                      onKeyDown={handleImageUrlAdd}
                      disabled={loading || watch('images')?.length >= 3}
                      helperText='Enter image URL and press Enter'
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {watch('images')?.map((url, index) => (
                      <div key={index} className='relative aspect-square'>
                        <img
                          src={url}
                          alt={`Service image ${index + 1}`}
                          className='w-full h-full object-cover rounded-lg'
                        />
                        <IconButton
                          size='small'
                          onClick={() => removeImage(index)}
                          className='absolute top-2 right-2 bg-black/50 hover:bg-black/70'
                        >
                          <XIcon className='text-white' size={18} />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
                {errors.images && <FormHelperText>{errors.images.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant='contained' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
