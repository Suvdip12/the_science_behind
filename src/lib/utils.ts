import { MediaObject, UploadedFile } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict, formatDate } from 'date-fns'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// file upload
export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: 'accurate' | 'normal'
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`
}



export function getMediaIds(mediaObjects: UploadedFile<unknown>[]): string[] {
  if (!mediaObjects || mediaObjects.length === 0) {
    return []
  }
  return mediaObjects.map(mediaObject => mediaObject.serverData as string )
}

export function formateRelativeDate(from: Date) {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getDate() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, {
      addSuffix: true
    })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'MMM d')
    } else {
      return formatDate(from, 'MMM d, yyy')
    }
  }
}
