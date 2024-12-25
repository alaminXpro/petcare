'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

export async function checkProviderStatus() {
  const user = await currentUser()

  if (!user) return null

  const provider = await db.provider.findUnique({
    where: { userId: user.id }
  })

  return provider
}

export async function requestToBeProvider() {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Check if already requested
  const existingRequest = await db.provider.findUnique({
    where: { userId: user.id }
  })

  if (existingRequest) {
    return { error: 'Request already exists' }
  }

  try {
    await db.provider.create({
      data: {
        userId: user.id,
        approval_status: 'Pending'
      }
    })

    revalidatePath('/dashboard/become-service-provider')

    return { success: 'Request submitted successfully' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

export async function getProviders() {
  const providers = await db.provider.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return providers
}

type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected'

export async function updateProviderStatus(providerId: string, status: ApprovalStatus) {
  try {
    await db.provider.update({
      where: { userId: providerId },
      data: { approval_status: status }
    })

    // Update user role based on status
    await db.user.update({
      where: { id: providerId },
      data: {
        role: status === 'Approved' ? 'Provider' : 'Customer'
      }
    })

    revalidatePath('/dashboard/providers')

    return { success: true }
  } catch (error) {
    return { error: 'Failed to update status' }
  }
}
