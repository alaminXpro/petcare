'use client'

import Image from 'next/image'

import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import type { Service } from '@/types'

export function ServiceCard({
  serviceId,
  title,
  description,
  priceAmount,
  priceCurrency,
  images,
  serviceType,
  tags
}: Service) {
  return (
    <Card className='overflow-hidden'>
      <Link href={`/services/${serviceId}`} className='hover:opacity-90 transition-opacity'>
        <div className='relative h-48 w-full'>
          <Image src={images?.[0] || '/placeholder.png'} alt={title} fill className='object-cover' />
        </div>
      </Link>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='line-clamp-1'>{title}</CardTitle>
          <span className='font-bold text-primary'>
            {priceCurrency} {priceAmount}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <span>{serviceType}</span>
          {tags?.length > 0 && (
            <>
              <span>•</span>
              <span>{tags[0]}</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className='line-clamp-2'>{description}</CardDescription>
        <Link href={`/services/${serviceId}`} className='hover:opacity-90 transition-opacity'>
          <Button className='w-full mt-4'>Book Now</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
