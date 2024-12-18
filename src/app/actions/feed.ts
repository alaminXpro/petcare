'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { FeedValidation } from '@/lib/validations/feed'

export async function createFeed(values: FormData) {
  try {
    const session = await auth()

    if (!session?.user) return { error: 'Unauthorized' }

    const content = values.get('content')
    const visibility = values.get('visibility')
    const images = values.getAll('images[]') as string[]

    const validatedFields = FeedValidation.parse({
      content,
      visibility,
      images
    })

    await db.feed.create({
      data: {
        content: validatedFields.content,
        visibility: validatedFields.visibility,
        images: validatedFields.images,
        authorId: session.user.id
      }
    })

    revalidatePath('/dashboard/newsfeed')

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }

    return { error: 'Failed to create post' }
  }
}

export async function updateFeed(values: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const session = await auth()

    if (!session?.user) return { error: 'Unauthorized' }

    const feedId = values.get('feedId')?.toString()

    if (!feedId) return { error: 'Feed ID is required' }

    const content = values.get('content')
    const visibility = values.get('visibility')
    const images = values.getAll('images[]') as string[]

    const validatedFields = FeedValidation.parse({
      content,
      visibility,
      images
    })

    const feed = await db.feed.findUnique({
      where: {
        feedId: parseInt(feedId) // Convert string to number since DB expects integer
      }
    })

    if (!feed || feed.authorId !== session.user.id) {
      return { error: 'Unauthorized' }
    }

    await db.feed.update({
      where: {
        feedId: parseInt(feedId)
      },
      data: {
        content: validatedFields.content,
        visibility: validatedFields.visibility,
        images: validatedFields.images
      }
    })

    revalidatePath('/dashboard/newsfeed')

    return { success: true }
  } catch (error) {
    console.error('Update feed error:', error)

    return { error: 'Failed to update post' }
  }
}

export async function getFeeds() {
  const session = await auth()

  // If no session, only return public feeds
  if (!session?.user) {
    return await db.feed.findMany({
      where: {
        visibility: 'Public'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  // Return all public feeds AND the user's private feeds
  return await db.feed.findMany({
    where: {
      OR: [
        { visibility: 'Public' },
        {
          AND: [{ visibility: 'Private' }, { authorId: session.user.id }]
        }
      ]
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })
}
