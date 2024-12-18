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

import { CldUploadButton, CldImage, CldUploadWidget } from 'next-cloudinary'

import { X as XIcon } from 'lucide-react'

import { productFormSchema, type ProductFormValues } from '@/lib/validations/product'
import { updateProduct } from '@/app/actions/product'

// Add CldImage import

interface EditProductDialogProps {
  open: boolean
  onClose: () => void
  product: ProductFormValues | null
}

export function EditProductDialog({ open, onClose, product }: EditProductDialogProps) {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productId: product?.productId || '',
      name: product?.name || '',
      description: product?.description || '',
      productType: product?.productType || 'Food',
      brand: product?.brand || '',
      priceCurrency: product?.priceCurrency || 'BDT',
      priceAmount: product?.priceAmount || 0,
      stock: product?.stock || 0,
      tags: product?.tags || [],
      images: product?.images || []
    }
  })

  useEffect(() => {
    if (product) {
      reset(product)
    }
  }, [product, reset])

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)

    try {
      const result = await updateProduct({ ...data, productId: product?.productId })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Product updated successfully')
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
      console.error(err)
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent dividers className='overflow-y-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
              <TextField {...field} fullWidth label='Brand' error={!!errors.brand} helperText={errors.brand?.message} />
            )}
          />
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
          <Controller
            name='stock'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='number'
                label='Stock'
                onChange={e => field.onChange(Number(e.target.value))}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />
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
