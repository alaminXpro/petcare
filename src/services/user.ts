import type { Prisma } from '@prisma/client'

import type { z } from 'zod'

import { db } from '@/lib/db'
import type { registerSchema } from '@/schemas'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
  try {
    return await db.user.create({
      data: payload
    })
  } catch {
    return null
  }
}

type UpdateUserType = Prisma.Args<typeof db.user, 'update'>['data']

export const updateUserById = async (id: string, payload: UpdateUserType) => {
  try {
    return await db.user.update({
      where: { id },
      data: payload
    })
  } catch {
    return null
  }
}

export const deleteUserById = async (id: string) => {
  try {
    // First get the user's email
    const user = await db.user.findUnique({
      where: { id },
      select: { email: true }
    })

    if (user?.email) {
      await db.$transaction([
        // Delete provider and related data first
        db.provider.deleteMany({ where: { userId: id } }),

        // Delete user generated content
        db.feed.deleteMany({ where: { authorId: id } }),
        db.message.deleteMany({ where: { senderId: id } }),
        db.conversation.deleteMany({
          where: {
            OR: [{ initiator_id: id }, { recipient_id: id }]
          }
        }),
        db.productReview.deleteMany({ where: { customerId: id } }),
        db.serviceReview.deleteMany({ where: { customerId: id } }),
        db.order.deleteMany({ where: { customerId: id } }),

        // Delete authentication related
        db.account.deleteMany({ where: { userId: id } }),
        db.twoFactorConfirmation.deleteMany({ where: { userId: id } }),

        // Finally delete the user
        db.user.delete({ where: { id } })
      ])
    }

    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error // Rethrow to handle in the action
  }
}
