'use client'

import { useEffect } from 'react'

interface ProductMetaTagsProps {
  product: {
    name: string
    description: string
    imageUrl: string
  }
}

export default function ProductMetaTags({ product }: ProductMetaTagsProps) {
  useEffect(() => {
    document.title = `${product.name} - Product Details`
    document.querySelector('meta[name="description"]')?.setAttribute('content', product.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', product.name)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', product.description)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', product.imageUrl)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'product')
  }, [product])

  return null
}
