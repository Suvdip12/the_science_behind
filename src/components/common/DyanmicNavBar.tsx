import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import logo from '@/assets/logo.png'
import { MoveLeft } from 'lucide-react'

function DyanmicNavBar({ title }: { title: string }) {
  const router = useRouter()
}
return (
  <nav className='navbar'>
    <MoveLeft onClick={() => router.back()} className='cursor-pointer' />
    <Link href='/' className='w-10 flex-none'>
      <img src={logo} className='w-full' />
    </Link>
    <p className='line-clamp-1 max-md:hidden'>{title}</p>
  </nav>
)

export default DyanmicNavBar
