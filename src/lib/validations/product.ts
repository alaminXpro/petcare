import * as z from 'zod'

// zod validation schema for product

export const productFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  brand: z.string().min(2, 'Brand must be at least 2 characters'),
  productType: z.enum(['Food', 'Accessories']),
  tags: z.array(z.string()),
  priceAmount: z.number().min(0, 'Price must be greater than 0'),
  priceCurrency: z.string().default('BDT'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  images: z.array(z.string()).min(1, 'At least one image is required')
})

export type ProductFormValues = z.infer<typeof productFormSchema>
