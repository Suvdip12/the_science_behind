import { formateRelativeDate } from '@/lib/utils'
import { PostData } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import avatar from '@/assets/avatar-placeholder.png'
interface PostProps {
  post: PostData
}

export default function Post({ post }: PostProps) {
  console.log(post)
  return (
    <Link
      className='mb-4 flex items-center gap-8 border-b border-grey pb-5'
      href={'/'}
    >
      <div className='w-full'>
        <div className='mb-7 flex items-center gap-2'>
          <Image
            src={post.user.avatarUrl || avatar}
            alt='author image'
            height={28}
            width={28}
            className='rounded-full'
          />
          <p className='line-clamp-1'>{post.user.name}</p>
          <p className='min-w-fit'>{formateRelativeDate(post.createdAt)}</p>
        </div>
        <h1 className='blog-title'>{post.title}</h1>
        <p className='my-3 line-clamp-2 font-gelasio text-xl leading-7 max-sm:hidden md:max-[1100px]:hidden'>
          {}
        </p>
        <div className='mt-7 flex gap-4'>
          <span className='btn-light px-4 py-1'>{post.topics[0]}</span>
          <span className='ml-3 flex items-center gap-2 text-dark-grey'>
            <Heart className='text-xl' />
          </span>
        </div>
      </div>
      <div className='aspect-square h-28 rounded-lg'>
        <img
          src={post.attachments[0].url}
          className='aspect-square h-full w-full rounded-lg object-cover'
          alt='image'
        />
      </div>
    </Link>
  )
}
