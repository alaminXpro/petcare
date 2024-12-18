'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import type { ServiceFormValues } from '@/lib/validations/service'
import { auth } from '@/auth'

export async function addService(data: ServiceFormValues) {
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

    const service = await db.service.create({
      data: {
        ...data,
        providerId: provider.userId,
        locations: data.locations // This will be stored as JSON
      }
    })

    revalidatePath('/dashboard/services')

    return { success: true, data: service }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function getServices() {
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

    const services = await db.service.findMany({
      where: {
        providerId: provider.userId
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return services
  } catch (error) {
    console.error('Failed to fetch services:', error)

    return []
  }
}

export async function updateService(data: ServiceFormValues) {
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

    const service = await db.service.update({
      where: {
        serviceId: data.serviceId,
        providerId: provider.userId // Ensure the service belongs to the provider
      },
      data: {
        title: data.title,
        description: data.description,
        serviceType: data.serviceType,
        priceCurrency: data.priceCurrency,
        priceAmount: data.priceAmount,
        status: data.status,
        tags: data.tags,
        images: data.images,
        locations: data.locations
      }
    })

    revalidatePath('/dashboard/services')

    return { success: true, data: service }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteService(serviceId: number) {
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

    await db.service.delete({
      where: {
        serviceId: serviceId,
        providerId: provider.userId // Ensure the service belongs to the provider
      }
    })

    revalidatePath('/dashboard/services')

    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
