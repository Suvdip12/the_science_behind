'use server'

import { validateRequest } from '@/auth'
import { blogSchema, BlogValues } from '@/validation/blog.schema'
import prisma from '@/lib/prisma'
import { getPostDataInclude, PostdataInclude } from '@/types'
import { isRedirectError } from 'next/dist/client/components/redirect'

export async function submitPost(inputs: BlogValues) {
  try {
    const { user } = await validateRequest()
    if (!user) throw new Error('Unauthorized')
    const { content, slug, title, topics, mediaIds, description } =
      blogSchema.parse(inputs)
    console.log('data', mediaIds, description)
    const newPost = await prisma.post.create({
      data: {
        content,
        slug,
        title,
        topics,
        description,
        userId: user.id,
        attachments: {
          connect: mediaIds?.map(id => ({ id }))
        }
      },
      include: PostdataInclude
    })
    //console.log(newPost)
    return newPost
  } catch (error) {
    console.log('error on post!', error)
  }
}
