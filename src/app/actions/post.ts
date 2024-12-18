'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import type { PostFormValues } from '@/lib/validations/post'

export async function addPost(data: PostFormValues) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if user is a provider
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      return { success: false, error: 'Only providers can create posts' }
    }

    const post = await db.post.create({
      data: {
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        tags: data.tags,
        visibility: data.visibility,
        authorId: provider.userId
      }
    })

    revalidatePath('/dashboard/posts')

    return { success: true, data: post }
  } catch (error) {
    console.error('Error adding post:', error)

    return { success: false, error: 'Failed to add post' }
  }
}

export async function updatePost(data: PostFormValues & { postId: number }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if user is a provider
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      return { success: false, error: 'Only providers can update posts' }
    }

    // Check if post exists and belongs to the provider
    const existingPost = await db.post.findFirst({
      where: {
        postId: data.postId,
        authorId: provider.userId
      }
    })

    if (!existingPost) {
      return { success: false, error: 'Post not found or unauthorized' }
    }

    const post = await db.post.update({
      where: {
        postId: data.postId
      },
      data: {
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        tags: data.tags,
        visibility: data.visibility
      }
    })

    revalidatePath('/dashboard/posts')

    return { success: true, data: post }
  } catch (error) {
    console.error('Error updating post:', error)

    return { success: false, error: 'Failed to update post' }
  }
}

export async function deletePost(postId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if user is a provider
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      return { success: false, error: 'Only providers can delete posts' }
    }

    // Check if post exists and belongs to the provider
    const existingPost = await db.post.findFirst({
      where: {
        postId: postId,
        authorId: provider.userId
      }
    })

    if (!existingPost) {
      return { success: false, error: 'Post not found or unauthorized' }
    }

    await db.post.delete({
      where: {
        postId: postId
      }
    })

    revalidatePath('/dashboard/posts')

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)

    return { success: false, error: 'Failed to delete post' }
  }
}

export async function getPosts() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if user is a provider
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      return { success: false, error: 'Only providers can view their posts' }
    }

    const posts = await db.post.findMany({
      where: {
        authorId: provider.userId
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return { success: false, error: 'Failed to fetch posts' }
  }
}
