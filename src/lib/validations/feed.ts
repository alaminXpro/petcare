import * as z from 'zod'

export const FeedValidation = z.object({
  content: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
  visibility: z.enum(['Public', 'Private']),
  images: z.array(z.string()).max(3, 'Maximum 3 images allowed').optional()
})

export type FeedFormValues = z.infer<typeof FeedValidation>
