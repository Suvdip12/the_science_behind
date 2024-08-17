'use client'
import { FilePen, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useSession } from './SessionProvider'
import UserButton from './UserButton'
import logo from '@/assets/logo.png'
import Image from 'next/image'
function Navbar() {
  const { user } = useSession()
  const [searchBoxVisibility, setsearchBoxVisibility] = useState<boolean>(false)
  return (
    <nav className='navbar'>
      <Link href='/' className='w-10 flex-none'>
        <Image
          width={24}
          height={24}
          alt='logo'
          src={logo}
          className='w-full'
        />
      </Link>
      <div
        className={`${searchBoxVisibility ? 'show' : 'hide'} md:show mt-0. absolute left-0 top-full w-full border-b border-grey bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0`}
      >
        <Input
          type='text'
          placeholder='Search'
          className='h-full w-full rounded-full bg-grey p-4 pl-6 pr-[12%] placeholder:text-dark-grey md:w-auto md:pl-12 md:pr-6'
        ></Input>

        <Search
          width={28}
          className='-translate-y-1/ 2 absolute right-[8%] top-1/3 text-dark-grey md:pointer-events-none md:left-3 md:top-1/4'
        ></Search>
      </div>
      <div className='ml-auto flex items-center gap-3 md:gap-6'>
        <Button
          onClick={() => setsearchBoxVisibility(currentVal => !currentVal)}
          className='flex h-12 w-12 content-center items-center rounded-full md:hidden'
        >
          <Search width={30} />
        </Button>
        <Link
          href={'/editor'}
          className='link hidden gap-2 rounded-2xl md:flex'
        >
          <FilePen />
          <p>Write</p>
        </Link>
        {user ? (
          <UserButton />
        ) : (
          <>
            <Link href='/signin' className='btn-dark py-2'>
              Sign In
            </Link>
            <Link href='/signup' className='btn-light hidden py-2 md:block'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
