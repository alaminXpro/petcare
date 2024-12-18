import { getServices } from '@/app/actions/service'
import { ServicesTable } from './_components/ServicesTable'

export default async function Services() {
  const services = await getServices()

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Services</h1>
      </div>
      <ServicesTable data={services} />
    </div>
  )
}
