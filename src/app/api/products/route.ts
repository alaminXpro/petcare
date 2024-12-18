import { NextResponse } from 'next/server'

import { Prisma } from '@prisma/client'

import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await db.$connect()

    const products = await db.product.findMany({
      orderBy: {
        created_at: 'desc'
      },
      select: {
        productId: true,
        name: true,
        description: true,
        priceAmount: true,
        priceCurrency: true,
        images: true,
        brand: true,
        stock: true,
        productType: true
      }
    })

    await db.$disconnect()

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
    await db.$disconnect()

    // Better error logging
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Database Error:', {
        code: error.code,
        message: error.message,
        meta: error.meta
      })
    } else {
      console.error('Unexpected Error:', error)
    }

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
