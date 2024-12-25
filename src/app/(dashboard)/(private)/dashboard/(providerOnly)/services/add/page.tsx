'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
  Chip,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material'
import { X as XIcon } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { CldUploadWidget } from 'next-cloudinary'

import { serviceFormSchema, type ServiceFormValues } from '@/lib/validations/service'
import { addService } from '@/app/actions/service'

const AddService = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      serviceType: 'Daycare',
      priceCurrency: 'BDT',
      tags: [],
      images: [],
      status: 'Active',
      locations: []
    }
  })

  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true)
    setError(null)

    try {
      const result = await addService(data)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Service added successfully')
      router.push('/dashboard/services')
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

  const handleImageUpload = (result: any) => {
    try {
      if (result?.info?.secure_url) {
        const currentImages = watch('images') || []
        const newUrl = result.info.secure_url

        setValue('images', [...currentImages, newUrl].slice(0, 3))
      }
    } catch (error) {
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

  const handleAddLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.target as HTMLInputElement
      const value = input.value.trim()

      if (value) {
        const currentLocations = watch('locations')

        setValue('locations', [...currentLocations, value])
        input.value = ''
      }
    }
  }

  const handleRemoveLocation = (locationToRemove: string) => {
    const currentLocations = watch('locations')

    setValue(
      'locations',
      currentLocations.filter(location => location !== locationToRemove)
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
            <div>
              <Typography variant='h4' className='mb-1'>
                Add a new service
              </Typography>
              <Typography>Add your service details below</Typography>
            </div>
            <div className='flex flex-wrap max-sm:flex-col gap-4'>
              <Button variant='outlined' color='secondary' onClick={() => router.back()} disabled={loading}>
                Discard
              </Button>
              <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Publish Service'}
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
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Service Information' />
                <CardContent className='space-y-4'>
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
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Service Images' />
                <CardContent>
                  <FormControl error={!!errors.images} fullWidth>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-4'>
                        <CldUploadWidget
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          options={{
                            maxFiles: 3,
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Pricing' />
                <CardContent className='space-y-4'>
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
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Tags' />
                <CardContent>
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

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Locations' />
                <CardContent>
                  <Controller
                    name='locations'
                    control={control}
                    render={({ field }) => (
                      <FormControl error={!!errors.locations} fullWidth>
                        <TextField
                          label='Add locations'
                          onKeyDown={handleAddLocation}
                          helperText='Press Enter to add locations'
                        />
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {field.value.map((location, index) => (
                            <Chip key={index} label={location} onDelete={() => handleRemoveLocation(location)} />
                          ))}
                        </div>
                        {errors.locations && <FormHelperText>{errors.locations.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Status' />
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AddService
