import { ServiceCard } from '@/components/service-card'
import type { ServicesApiResponse, Service } from '@/types'

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data: ServicesApiResponse = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch services')
    }

    return data.services
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

export default async function Services() {
  const services = await getServices()

  return (
    <div className='container mx-auto py-12 px-4 max-w-7xl'>
      <h1 className='text-3xl font-bold mb-12 text-center'>Our Services</h1>
      {services.length === 0 ? (
        <p className='text-center text-muted-foreground'>No services available.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {services.map(service => (
            <ServiceCard key={service.serviceId} {...service} />
          ))}
        </div>
      )}
    </div>
  )
}
