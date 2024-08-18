'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import AnimationWrapper from './common/page-animation'

interface CardWrapperProps {
  children?: React.ReactNode
  type: string
}

function UserAuthFormCard({ children, type }: CardWrapperProps) {
  return (
    <AnimationWrapper keyValue={type}>
      <section className='h-cover flex items-center justify-center'>
        <div className='w-[80%] max-w-[400px]'>
          <h1 className='mb-8 text-center font-gelasio text-4xl capitalize'>
            {type === 'sign-in' ? 'Welcome back' : 'Join us today'}
          </h1>
          {children}
          <div className='relative my-5 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10'>
            <hr className='w-1/2 border-black' />
            <p>or</p>
            <hr className='w-1/2 border-black' />
          </div>
          <Button className='mx-auto flex w-[90%] items-center justify-center gap-4 rounded-full p-6'>
            <Image
              alt='google'
              src='/google.png'
              width={5}
              height={5}
              className='w-5'
            />
            continue with google
          </Button>

          {type === 'sign-in' ? (
            <p className='mx-auto mt-4 text-center text-xl text-dark-grey'>
              Don't have an account ?
              <Link
                href='/signup'
                className='ml-1 text-xl text-black underline dark:text-white'
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p className='mt-4 text-center text-xl text-dark-grey'>
              Already member ?
              <Link
                href='/signin'
                className='text-balack mx-auto ml-1 text-xl underline dark:text-white'
              >
                Sign in here.
              </Link>
            </p>
          )}
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default UserAuthFormCard
