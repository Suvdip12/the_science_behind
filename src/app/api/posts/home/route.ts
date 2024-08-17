import prisma from '@/lib/prisma'
import { PostdataInclude, PostsPage } from '@/types'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get('cursor') || undefined
    const pageSize = 10
    const posts = await prisma.post.findMany({
      include: PostdataInclude,
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined
    })
    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null
    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor
    }
    return Response.json(data)
  } catch (error) {
    console.log(error)
    return Response.json({
      error: 'Internal server error'
    })
  }
}
