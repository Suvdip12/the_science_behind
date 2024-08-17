'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import UserAuthFormCard from '@/components/userAuthForm'
import { signInSchema } from '@/validation/login.schema'
import { signIn } from '@/lib/actions/user.actions'
import { useTransition } from 'react'
import LoadingButton from '@/components/LoadingButton'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from 'sonner'

function SignInPage() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  function onSubmit(values: z.infer<typeof signInSchema>) {
    startTransition(async () => {
      const { error } = await signIn(values)
      if (error) {
        toast.error(error)
      }
    })
  }
  return (
    <UserAuthFormCard type='sign-in'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='input-box'
                    placeholder='Enter your email..'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className='input-box'
                    placeholder='Enter your password..'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={isPending}
            type='submit'
            size='lg'
            className='btn-dark w-full rounded-2xl'
          >
            Sign In
          </LoadingButton>
        </form>
      </Form>
    </UserAuthFormCard>
  )
}

export default SignInPage
