import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const blog = await db.post.findUnique({
      where: {
        postId: parseInt(params.id),
        visibility: 'Public'
      },
      include: {
        author: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}
