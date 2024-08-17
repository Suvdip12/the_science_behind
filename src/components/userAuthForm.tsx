"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import AnimationWrapper from "./common/page-animation"

interface CardWrapperProps{
    children?:React.ReactNode
    type:string
}

function UserAuthFormCard({children,type}: CardWrapperProps) {
  return (
    <AnimationWrapper keyValue={type}>
    <section className='h-cover flex items-center justify-center'>
        <div className='w-[80%] max-w-[400px]'>
            <h1 className=' text-4xl capitalize font-gelasio text-center mb-8'>
                {type === 'sign-in' ? 'Welcome back' : 'Join us today'}
            </h1>
            {children}
            <div className=" relative w-full flex gap-2 my-5 opacity-10 uppercase text-black font-bold items-center">
              <hr className="w-1/2 border-black" />
              <p>or</p>
              <hr className="w-1/2 border-black" />

            </div>
            <Button className="flex p-6 rounded-full items-center justify-center gap-4 w-[90%] mx-auto">
              <Image alt="google" src="/google.png" width={5} height={5} className="w-5 " />
              continue with google</Button>

            {
              type ==="sign-in"?<p className="text-xl text-center text-dark-grey mx-auto mt-4">
                Don't have an account ?
                <Link href="/signup" className="underline text-balack dark:text-white text-xl ml-1">
                Join us today</Link>
              </p>:<p className="text-xl text-center text-dark-grey mt-4">
                Already member ?
                <Link href="/signin" className="underline text-balack dark:text-white mx-auto text-xl ml-1">
                Sign in hare.
                </Link>
              </p>
            }
        </div>
    </section>
    </AnimationWrapper>
  )
}

export default UserAuthFormCard