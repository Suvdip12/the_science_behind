import { PostData } from '@/types'
import Link from 'next/link'
import avatar from '@/assets/avatar-placeholder.png'
import Image from 'next/image'
import { formateRelativeDate } from '@/lib/utils'

interface PostProps {
  post: PostData
  index: number
}

export default function MinimalBlogPost({ post, index }: PostProps) {
  return (
    <Link href={`/blog/${post.slug}`} className='mb-8 flex gap-5'>
      <h1 className='blog-index'>{index < 10 ? '0' + (index + 1) : index}</h1>
      <div>
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
      </div>
    </Link>
  )
}
