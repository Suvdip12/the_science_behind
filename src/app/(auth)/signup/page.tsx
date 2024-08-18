"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/validation/signup.schema";
import UserAuthFormCard from "@/components/userAuthForm";
import { PasswordInput } from "@/components/ui/password-input";
import LoadingButton from "@/components/LoadingButton";
import { useTransition } from "react";
import { signUp } from "@/lib/actions/user.actions";
import { toast } from "sonner";

function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        toast.error(error);
      }
    });
  }
  return (
    <UserAuthFormCard type='sign-up'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className='input-box'
                    placeholder='Enter your full name..'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder='Enter a password..'
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
            Create account
          </LoadingButton>
        </form>
      </Form>
    </UserAuthFormCard>
  );
}

export default SignUpPage;
