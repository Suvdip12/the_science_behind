import * as z from 'zod'
export const signInSchema = z.object({
  email: z.string().trim().min(2, 'Required').email('Invalid amail address'),
  password: z
    .string()
    .trim()
    .min(2, 'Required')
    .min(8, 'Must be at least 8 characters')
})

export type SignInValues = z.infer<typeof SignInSchema>
