import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function PostsLoadingSkeletion() {
  return (
    <div className='space-y-4'>
      <PostLoadingSkeletion />
      <PostLoadingSkeletion />
      <PostLoadingSkeletion />
    </div>
  )
}
function PostLoadingSkeletion() {
  return (
    <div className='flex items-center gap-8 border-b border-grey pb-5'>
      <div className='w-full'>
        <div className='mb-7 flex items-center gap-2'>
          <Skeleton className='size-10 rounded-full' />
          <Skeleton className='h-4 w-24 rounded' />
          <Skeleton className='h-4 w-20 rounded-lg' />
        </div>
        <Skeleton className='h-16 rounded' />
        <Skeleton className='h-12 rounded' />
        <div className='mt-7 flex gap-4'>
          <Skeleton className='h-6 w-36 rounded-2xl' />
        </div>
      </div>
      <div className='aspect-square h-32 rounded-lg'>
        <Skeleton className='aspect-square h-full w-full rounded-lg object-cover' />
      </div>
    </div>
  )
}
