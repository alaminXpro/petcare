import * as z from 'zod'

export const addressFormSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  notes: z.string().optional()
})

export type AddressFormData = z.infer<typeof addressFormSchema>
