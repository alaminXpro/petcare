'use server'

import { revalidatePath } from 'next/cache'

import type { ProductType } from '@prisma/client'

import { db } from '@/lib/db'
import type { ProductFormValues } from '@/lib/validations/product'
import { auth } from '@/auth'

export async function addProduct(data: ProductFormValues) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      throw new Error('Unauthorized')
    }

    // Get provider info
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      throw new Error('Provider not found')
    }

    const product = await db.product.create({
      data: {
        ...data,
        supplierId: provider.userId
      }
    })

    revalidatePath('/dashboard/products')

    return { success: true, data: product }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

interface ProductFilters {
  search?: string
  productType?: ProductType | ''
}

export async function getProducts(filters?: ProductFilters) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      throw new Error('Unauthorized')
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      throw new Error('Provider not found')
    }

    const products = await db.product.findMany({
      where: {
        supplierId: provider.userId,
        ...(filters?.productType && { productType: filters.productType }),
        ...(filters?.search && {
          OR: [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { brand: { contains: filters.search, mode: 'insensitive' } },
            { tags: { hasSome: [filters.search] } }
          ]
        })
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)

    return []
  }
}

export async function updateProduct(data: ProductFormValues) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      throw new Error('Unauthorized')
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      throw new Error('Provider not found')
    }

    const product = await db.product.update({
      where: { productId: data.productId },
      data: {
        ...data,
        supplierId: provider.userId
      }
    })

    revalidatePath('/dashboard/products')

    return { success: true, data: product }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteProduct(productId: number) {
  // Ensure productId is correctly received
  try {
    const session = await auth()

    if (!session || !session.user) {
      throw new Error('Unauthorized')
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      throw new Error('Provider not found')
    }

    await db.product.delete({
      where: { productId } // Ensure productId is correctly used
    })

    revalidatePath('/dashboard/products')

    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
