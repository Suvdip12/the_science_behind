import * as z from 'zod'
export const blogSchema = z.object({
  mediaIds: z.array(z.string()).optional(),
  title: z.string().min(8, 'Title must be at last 8 caracters'),
  slug: z.string().min(8, 'Slug must be at least 8 caracters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 caracters')
    .max(400, 'Description at max be 400 caracters'),
  content: z.string().min(50, 'Content must be at least 50 caracters'),
  topics: z
    .array(z.string())
    .min(1, 'At least one topic must be required')
    .max(4, 'No more than 4 topics are allowed')
})

export type BlogValues = z.infer<typeof blogSchema>
