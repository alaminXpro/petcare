'use client'

import { useState } from 'react'

import Image from 'next/image'

import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { Typography, Rating, Box, Grid } from '@mui/material'
import { Star, ShoppingCart, Package, Truck, BarChart, DollarSign } from 'lucide-react'

import { addToCart } from '@/redux-store/slices/cart'

interface ProductOverviewProps {
  product: {
    productId: string
    name: string
    description: string
    priceCurrency: string
    priceAmount: number
    brand: string
    images: string[]
    stock: number
    total_sold: number
  }
}

export function ProductImages({ product }: ProductOverviewProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1/1',
          width: '100%',
          maxWidth: { xs: '100%', sm: '500px' },
          mx: 'auto'
        }}
      >
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='rounded-lg object-cover'
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mt: 2 }}>
        {product.images.map((image, index) => (
          <Box
            key={index}
            onClick={() => setSelectedImage(image)}
            sx={{
              flexShrink: 0,
              width: 80,
              height: 80,
              position: 'relative',
              borderRadius: 1,
              overflow: 'hidden',
              border: selectedImage === image ? '2px solid' : '2px solid transparent',
              borderColor: 'primary.main',
              cursor: 'pointer'
            }}
          >
            <Image src={image} alt={`${product.name} ${index + 1}`} fill sizes='80px' className='object-cover' />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export function ProductDetails({ product }: ProductOverviewProps) {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        type: 'product',
        productId: Number(product.productId),
        name: product.name,
        price: product.priceAmount,
        quantity: quantity,
        image: product.images[0]
      })
    )

    toast.success('Added to cart successfully')
  }

  return (
    <Box sx={{ space: 'y-4' }}>
      <Typography variant='h4' component='h1' className='font-bold'>
        {product.name}
      </Typography>
      <Typography variant='body1' color='text.secondary' className='text-gray-600'>
        {product.description}
      </Typography>
      <div className='flex flex-wrap items-center gap-2'>
        <Typography variant='h5' component='span' className='font-bold text-blue-600'>
          {product.priceCurrency} {product.priceAmount.toFixed(2)}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Rating value={4.5} readOnly precision={0.5} />
          <Typography variant='body2' color='text.secondary' className='ml-1'>
            (500 reviews)
          </Typography>
        </Box>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center space-x-2'>
          <Package className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Brand: {product.brand}
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <Truck className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            In stock: {product.stock}
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <BarChart className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Total sold: {product.total_sold}
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <DollarSign className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Free shipping
          </Typography>
        </div>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderRadius: 1 }}>
          <button
            onClick={decreaseQuantity}
            className='px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg'
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className='px-4 py-2 text-gray-700 font-medium'>{quantity}</span>
          <button
            onClick={increaseQuantity}
            className='px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg'
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </Box>
        <button
          onClick={handleAddToCart}
          className='py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center space-x-1'
        >
          <ShoppingCart className='w-5 h-5' />
          <span>Add to Cart</span>
        </button>
      </Box>
    </Box>
  )
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProductImages product={product} />
        </Grid>
        <Grid item xs={12}>
          <ProductDetails product={product} />
        </Grid>
      </Grid>
    </Box>
  )
}
