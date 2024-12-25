'use client'

import { useEffect } from 'react'

interface ServiceMetaTagsProps {
  service: {
    title: string
    description: string
    imageUrl: string
  }
}

export default function ServiceMetaTags({ service }: ServiceMetaTagsProps) {
  useEffect(() => {
    document.title = `${service.title} - Service Details`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', service.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', service.description)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', service.imageUrl)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'service')
  }, [service])

  return null
}
