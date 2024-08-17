import * as z from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().trim().min(2, 'Required').email('Invalid amail address'),
  password: z
    .string()
    .trim()
    .min(2, 'Required')
    .min(8, 'Must be at least 8 characters')
})

export type SignUpValues = z.infer<typeof signUpSchema>
