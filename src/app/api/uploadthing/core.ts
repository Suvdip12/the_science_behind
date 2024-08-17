import { validateRequest } from '@/auth'
import prisma from '@/lib/prisma'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  banner: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // const user = await auth(req)
      const { user } = await validateRequest()
      if (!user) throw new UploadThingError('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await prisma.media.create({
        data: {
          url: file.url.replace(
            '/f/',
            `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
          ),
          type: file.type.startsWith('image') ? 'IMAGE' : 'VIDEO'
        }
      })

      return { mediaId: media.id }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
