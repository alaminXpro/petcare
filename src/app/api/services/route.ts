import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'

// Public route to fetch all services

export async function GET() {
  try {
    await db.$connect()

    const services = await db.service.findMany({
      where: {
        status: 'Active'
      },
      orderBy: {
        created_at: 'desc'
      },
      select: {
        serviceId: true,
        title: true,
        description: true,
        priceAmount: true,
        priceCurrency: true,
        images: true,
        serviceType: true,
        status: true,
        locations: true,
        tags: true
      }
    })

    await db.$disconnect()

    return NextResponse.json(
      {
        success: true,
        services: services || []
      },
      { status: 200 }
    )
  } catch (error) {
    await db.$disconnect()

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
      { status: 500 }
    )
  }
}
