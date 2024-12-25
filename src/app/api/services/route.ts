import { NextResponse } from 'next/server'

import type { ServiceType } from '@prisma/client'

import { db } from '@/lib/db'

// Public route to fetch all services

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const serviceType = searchParams.get('serviceType') as ServiceType | null
    const location = searchParams.get('location')?.toLowerCase()

    const services = await db.service.findMany({
      where: {
        status: 'Active',
        ...(serviceType && { serviceType }),
        ...(search && {
          OR: [{ title: { contains: search, mode: 'insensitive' } }, { tags: { hasSome: [search] } }]
        }),
        ...(location && {
          locations: {
            array_contains: location // Changed from hasSome to array_contains
          }
        })
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

    return NextResponse.json({ success: true, services })
  } catch (error) {
    console.error('Error fetching services:', error)

    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 })
  }
}
