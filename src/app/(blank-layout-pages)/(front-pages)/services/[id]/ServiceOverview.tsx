'use client'

import { useState } from 'react'

import Image from 'next/image'

import { toast } from 'sonner'

import { Typography, Rating, Box, Grid, Chip } from '@mui/material'
import { Calendar, Clock, DollarSign, Star, Users, MapPin, Tag } from 'lucide-react'

import { useDispatch } from 'react-redux'

import { addToCart } from '@/redux-store/slices/cart'

interface ServiceOverviewProps {
  service: {
    serviceId: string
    title: string
    description: string
    priceCurrency: string
    priceAmount: number
    capacity: number
    images: string[]
    total_bookings: number
    status: 'Active' | 'Inactive'
    locations: string[]
    tags: string[]
  }
}

export function ServiceDetails({ service }: ServiceOverviewProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    console.log('Attempting to add service to cart...')

    if (service.status === 'Active') {
      const serviceItem = {
        type: 'service' as const,
        serviceId: Number(service.serviceId),
        name: service.title,
        price: service.priceAmount,
        quantity: 1,
        image: service.images[0]
      }

      console.log('Dispatching service item:', serviceItem)
      dispatch(addToCart(serviceItem))
      toast.success('Service added to cart successfully')
    } else {
      toast.error('This service is currently inactive')
    }
  }

  return (
    <Box sx={{ space: 'y-4' }}>
      <Typography variant='h4' component='h1' className='font-bold'>
        {service.title}
      </Typography>
      <Typography variant='body1' color='text.secondary' className='text-gray-600'>
        {service.description}
      </Typography>

      {/* Status Badge */}
      <Chip
        label={service.status}
        color={service.status === 'Active' ? 'success' : 'error'}
        size='small'
        sx={{ mt: 1 }}
      />

      {/* Price and Rating */}
      <div className='flex flex-wrap items-center gap-2 mt-2'>
        <Typography variant='h5' component='span' className='font-bold text-blue-600'>
          {service.priceCurrency} {service.priceAmount.toFixed(2)}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Rating value={4.5} readOnly precision={0.5} />
          <Typography variant='body2' color='text.secondary' className='ml-1'>
            (500 reviews)
          </Typography>
        </Box>
      </div>

      {/* Service Details Grid */}
      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div className='flex items-center space-x-2'>
          <Users className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Capacity: 50 pets
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <Calendar className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Total bookings: {service.total_bookings}
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <DollarSign className='w-5 h-5 text-gray-500' />
          <Typography variant='body2' color='text.secondary'>
            Cancellation available
          </Typography>
        </div>
      </div>

      {/* Locations */}
      <Box sx={{ mt: 3 }}>
        <Typography variant='subtitle1' className='font-semibold flex items-center gap-2'>
          <MapPin className='w-5 h-5' />
          Service Locations
        </Typography>
        <div className='flex flex-wrap gap-2 mt-2'>
          {service.locations.map((location, index) => (
            <Chip key={index} label={location} size='small' />
          ))}
        </div>
      </Box>

      {/* Tags */}
      <Box sx={{ mt: 3 }}>
        <Typography variant='subtitle1' className='font-semibold flex items-center gap-2'>
          <Tag className='w-5 h-5' />
          Tags
        </Typography>
        <div className='flex flex-wrap gap-2 mt-2'>
          {service.tags.map((tag, index) => (
            <Chip key={index} label={tag} size='small' />
          ))}
        </div>
      </Box>

      {/* Book Now Button */}
      <Box sx={{ mt: 4 }}>
        <button
          onClick={() => handleAddToCart()}
          disabled={service.status === 'Inactive'}
          className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Calendar className='w-5 h-5' />
          <span>Book Now</span>
        </button>
      </Box>
    </Box>
  )
}

export function ServiceImages({ service }: ServiceOverviewProps) {
  const [selectedImage, setSelectedImage] = useState(service.images[0])

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
          alt={service.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='rounded-lg object-cover'
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mt: 2 }}>
        {service.images.map((image, index) => (
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
            <Image src={image} alt={`${service.title} ${index + 1}`} fill sizes='80px' className='object-cover' />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ServiceImages service={service} />
        </Grid>
        <Grid item xs={12}>
          <ServiceDetails service={service} />
        </Grid>
      </Grid>
    </Box>
  )
}
