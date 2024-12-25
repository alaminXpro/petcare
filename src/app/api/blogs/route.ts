import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const blogs = await db.post.findMany({
      where: {
        visibility: 'Public'
      },
      select: {
        postId: true,
        title: true,
        content: true,
        thumbnail: true,
        created_at: true,
        tags: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
