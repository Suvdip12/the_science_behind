import { X } from 'lucide-react'
import React from 'react'
type TagCardProps = {
  tag: string
  onTagDelete: (tag: string) => void
}
function Tag({ tag, onTagDelete }: TagCardProps) {
  return (
    <div className='relative mr-2 inline-block rounded-full p-3 px-5 pr-8 hover:bg-opacity-50'>
      <p className='outline-none'>{tag}</p>
      <button
        type='button'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full'
        onClick={() => onTagDelete(tag)}
      >
        <X className='pointer-events-none' size={18} />
      </button>
    </div>
  )
}

export default Tag
