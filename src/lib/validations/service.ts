import * as z from 'zod'

export const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  serviceType: z.enum(['Daycare', 'Rescue', 'Vet', 'Adoption']),
  tags: z.array(z.string()),
  priceAmount: z.number().min(0, 'Price must be greater than 0'),
  priceCurrency: z.string().default('BDT'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  status: z.enum(['Active', 'Inactive']),
  locations: z.array(z.string()).min(1, 'At least one location is required')
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
