import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@mui/material'
import { Eye } from 'lucide-react'

import { Card, CardContent, CardHeader } from './ui/card'

interface ProductCardProps {
  productId: string
  name: string
  description: string
  priceAmount: number
  priceCurrency: string
  images: string[]
  brand: string
  productType: string
}

export function ProductCard({
  productId,
  name,
  description,
  priceAmount,
  priceCurrency,
  images,
  brand,
  productType
}: ProductCardProps) {
  return (
    <Card className='h-full flex flex-col'>
      <Link href={`/products/${productId}`} className='hover:opacity-90 transition-opacity'>
        <CardHeader className='p-0'>
          <div className='relative aspect-square'>
            <Image src={images[0] || '/placeholder.png'} alt={name} fill className='object-cover rounded-t-lg' />
          </div>
        </CardHeader>
      </Link>
      <CardContent className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-semibold text-lg'>{name}</h3>
          <span className='text-xs text-muted-foreground'>{productType}</span>
        </div>
        <p className='text-sm text-muted-foreground mb-1'>{brand}</p>
        <p className='text-sm text-muted-foreground line-clamp-2'>{description}</p>
        <div className='mt-auto pt-4 flex justify-between items-center'>
          <p className='font-bold'>
            {priceCurrency} {priceAmount.toFixed(2)}
          </p>
          <Button
            component={Link}
            href={`/products/${productId}`}
            variant='outlined'
            size='small'
            startIcon={<Eye size={16} />}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
