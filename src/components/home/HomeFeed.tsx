'use client'
import prisma from '@/lib/prisma'
import React from 'react'
import Post from '../common/Post'
import { PostData, PostdataInclude, PostsPage } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import kyInstance from '@/lib/ky'
import InfiniteScrollContainer from '../InfiniteScrollContainer'
import PostsLoadingSkeletion from '../common/PostsLoadingSkeletion'

export default function HomeFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['post-feed', 'home-feed'],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          '/api/posts/home',
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor
  })
  const posts = data?.pages.flatMap(page => page.posts) || []

  if (status === 'pending') {
    return <PostsLoadingSkeletion />
  }
  if (status === 'success' && !posts.length && hasNextPage) {
    return <p className='text-center text-muted-foreground'>No posts yet</p>
  }
  if (status === 'error') {
    return (
      <p className='text-center text-destructive'>
        An error occurred while lading posts.
      </p>
    )
  }
  console.log(posts)
  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className='mx-auto my-3 animate-spin' />}
    </InfiniteScrollContainer>
  )
}
