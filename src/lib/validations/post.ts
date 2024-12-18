import * as z from 'zod'

export const postFormSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()),
  visibility: z.enum(['Public', 'Private'])
})

export type PostFormValues = z.infer<typeof postFormSchema>
