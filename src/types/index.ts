import { type ClientUploadedFileData } from 'uploadthing/types'
import { Prisma } from '@prisma/client'

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
export interface MediaObject {
  mediaId: string
  [key: string]: any // To allow additional properties
}

export const PostdataInclude = {
  user: {
    select: {
      name: true,
      avatarUrl: true
    }
  },
  attachments: true
} satisfies Prisma.PostInclude

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostdataInclude
}>

export interface PostsPage {
  posts: PostData[]
  nextCursor: string | null
}
