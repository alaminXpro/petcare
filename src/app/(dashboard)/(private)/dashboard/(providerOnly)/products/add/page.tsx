'use client'

// MUI Imports
import { useState } from 'react'

import { useRouter } from 'next/navigation'

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

// Replace react-feather import with lucide-react
import { X as XIcon } from 'lucide-react'

// Form Imports
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'

// Add CldImage import
import { CldUploadButton, CldImage, CldUploadWidget } from 'next-cloudinary'

import { productFormSchema, type ProductFormValues } from '@/lib/validations/product'

// Action Import
import { addProduct } from '@/app/actions/product'

import { cloudinaryConfig } from '@/lib/cloudinary'

const ProductAdd = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productType: 'Food',
      priceCurrency: 'BDT',
      tags: [],
      images: []
    }
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    setError(null)

    console.log('Form data on submit:', data) // Log form data

    try {
      const result = await addProduct(data)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Product added successfully')
      router.push('/dashboard/products')
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
        console.log('Upload success:', result.info)
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
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
            <div>
              <Typography variant='h4' className='mb-1'>
                Add a new product
              </Typography>
              <Typography>Add your product details below</Typography>
            </div>
            <div className='flex flex-wrap max-sm:flex-col gap-4'>
              <Button variant='outlined' color='secondary' onClick={() => router.back()} disabled={loading}>
                Discard
              </Button>
              <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Publish Product'}
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
                <CardHeader title='Product Information' />
                <CardContent className='space-y-4'>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Product Name'
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                    name='productType'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label='Product Type'
                        error={!!errors.productType}
                        helperText={errors.productType?.message}
                      >
                        <MenuItem value='Food'>Food</MenuItem>
                        <MenuItem value='Accessories'>Accessories</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name='brand'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Brand'
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Product Images' />
                <CardContent>
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
                              alt={`Product image ${index + 1}`}
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
                        onChange={e => field.onChange(Number(e.target.value))} // Convert to number
                        error={!!errors.priceAmount}
                        helperText={errors.priceAmount?.message}
                      />
                    )}
                  />

                  <Controller
                    name='stock'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Stock'
                        onChange={e => field.onChange(Number(e.target.value))} // Convert to number
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
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
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductAdd
