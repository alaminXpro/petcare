import { NextResponse } from 'next/server'

import type { ProductType } from '@prisma/client'

import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const productType = searchParams.get('productType') as ProductType | null

    const products = await db.product.findMany({
      where: {
        ...(productType && { productType }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } },
            { tags: { hasSome: [search] } }
          ]
        })
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(
      {
        success: true,
        products: products || []
      },
      {
        status: 200
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed. Please try again later.'
      },
      {
        status: 500
      }
    )
  }
}
