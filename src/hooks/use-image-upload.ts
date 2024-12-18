'use client'
import { useState } from 'react'

export const useImageUpload = (maxImages: number = 3) => {
  const [images, setImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    setIsUploading(true)
    const newImages: string[] = []

    try {
      for (let i = 0; i < Math.min(files.length, maxImages); i++) {
        const file = files[i]
        const reader = new FileReader()

        const imageDataUrl = await new Promise<string>(resolve => {
          reader.onload = e => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })

        newImages.push(imageDataUrl)
      }

      setImages(prev => [...prev, ...newImages].slice(0, maxImages))
    } catch (error) {
      console.error('Error processing images:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return {
    images,
    setImages,
    isUploading,
    handleImageUpload,
    removeImage
  }
}
