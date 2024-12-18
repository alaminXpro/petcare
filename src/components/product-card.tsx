import Image from 'next/image'

import { Card, CardContent, CardHeader } from './ui/card'

interface ProductCardProps {
  name: string
  description: string
  priceAmount: number
  priceCurrency: string
  images: string[]
  brand: string
  productType: string
}

export function ProductCard({
  name,
  description,
  priceAmount,
  priceCurrency,
  images,
  brand,
  productType
}: ProductCardProps) {
  return (
    <Card className='h-full'>
      <CardHeader className='p-0'>
        <div className='relative aspect-square'>
          <Image src={images[0] || '/placeholder.png'} alt={name} fill className='object-cover rounded-t-lg' />
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-semibold text-lg'>{name}</h3>
          <span className='text-xs text-muted-foreground'>{productType}</span>
        </div>
        <p className='text-sm text-muted-foreground mb-1'>{brand}</p>
        <p className='text-sm text-muted-foreground line-clamp-2'>{description}</p>
        <p className='mt-2 font-bold'>
          {priceCurrency} {priceAmount.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}
