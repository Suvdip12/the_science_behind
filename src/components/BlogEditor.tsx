'use client'
import { useCallback, useEffect, useState, useTransition } from 'react'
import AnimationWrapper from './common/page-animation'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useUploadFile } from '@/hooks/use-upload-file'
import { FileUploader } from './file-uploader'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { blogSchema } from '@/validation/blog.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,

  FormMessage
} from '@/components/ui/form'
import Tag from './tags'
import { cn, getMediaIds } from '@/lib/utils'
import {  X } from 'lucide-react'
import Editor from '@/components/editor/editor'
import LoadingButton from './LoadingButton'
import { useSubmitPostMutation } from './editor/mutation'
import Image from 'next/image'
import { z } from 'zod'
export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}
type Props = {}

function BlogEditor({}: Props) {
  const [tags, setTags] = useState<string[]>([])
  const [bannerUrl, setBannerUrl] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const mutation = useSubmitPostMutation()
  const { onUpload, progresses, uploadedFiles, isUploading, removeAttachment } =
    useUploadFile('banner', { defaultUploadedFiles: [] })

  const handleTitleKeyKeyDown =(e:any) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  const handleTopicKeyDown = (e:any) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault()
      let tag = e.target.value
      if (tag.length) {
        if (!tags.includes(tag)) {
          setTags([...tags, tag])
          form.setValue('topics', [...tags, tag])
          e.target.value = ''
        }
      }
    }
  }
  const handleTagDelete = (tag: string) => {
    setTags(prev => {
      const updatedTags = prev.filter(prevtag => prevtag !== tag)
      // Update form value here
      form.setValue('topics', updatedTags)
      return updatedTags
    })
  }
  const slugTransform = useCallback((value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, '-')
      .replace(/\s/g, '-')
      .replace(/[^a-zA-Z0-9]+/g, '-')
  },[])

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      description: '',
      mediaIds: [],
      title: '',
      content: '',
      slug: '',
      topics: []
    }
  })
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        form.setValue('slug', slugTransform(value.title||""))
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch, slugTransform, form.setValue])

  function onSubmit(values: z.infer<typeof blogSchema>) {
    mutation.mutate(
      {
        ...values,
        mediaIds: getMediaIds(uploadedFiles).filter(Boolean) as string[]
      },
      {
        onSuccess: () => {
          console.log('Blog created successfully')
        }
      }
    )
  }
  console.log('check', getMediaIds(uploadedFiles))
  //console.log(uploadedFiles)

  return (
    <>
      <AnimationWrapper>
        <section>
          <div className='mx-auto w-full max-w-[900px]'>
            {uploadedFiles[0]?.url ? (
              <div
                className={cn(
                  'relative mx-auto size-fit',
                  isUploading && 'opacity-50'
                )}
              >
                <Image
                  //TODO: loading state
                  src={uploadedFiles[0].url}
                  alt='Attachment preview'
                  width={500}
                  height={500}
                  className='size-fit max-h-[30rem] rounded-2xl'
                />
                {!isUploading && (
                  <button
                    onClick={() => removeAttachment(uploadedFiles[0].name)}
                    className='absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60'
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ) : (
              <FileUploader
                maxFileCount={1}
                maxSize={1 * 1024 * 1024}
                progresses={progresses}
                onUpload={onUpload}
                disabled={isUploading}
              />
            )}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        onKeyDown={handleTitleKeyKeyDown}
                        // onChange={handleTitleChange}
                        className='scrollbar-hidden mt-7 h-28 w-full scroll-auto text-4xl font-medium leading-tight outline-none placeholder:opacity-40 dark:text-white'
                        placeholder='Blog Title'
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='mt-6 w-full text-xl font-medium leading-tight outline-none placeholder:opacity-50 dark:text-white'
                        placeholder='slug'
                        disabled={true}
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* editor */}
              <Editor
                initialValue={defaultValue}
                onChange={newContent => form.setValue('content', newContent)}
              />
              <p className='font-sm text-red'>
                {form.formState.errors?.content?.message}
              </p>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        onKeyDown={handleTitleKeyKeyDown}
                        // onChange={handleTitleChange}
                        className='scrollbar-hidden mt-7 h-16 w-full resize-none scroll-auto text-sm font-medium leading-tight outline-none placeholder:opacity-40 dark:text-white'
                        placeholder='Blog small description.'
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='relative w-full'>
                <Input
                  spellCheck={false}
                  type='text'
                  placeholder='Topic'
                  className='sticky left-0 top-0 mb-3 h-14 w-full pl-4'
                  onKeyDown={handleTopicKeyDown}
                />
                <p className='font-sm text-red'>
                  {form.formState.errors?.topics?.message}
                </p>
                {tags.map((tag, index) => (
                  <Tag onTagDelete={handleTagDelete} key={index} tag={tag} />
                ))}
              </div>
              <LoadingButton
                disabled={isUploading}
                loading={mutation.isPending}
                type='submit'
              >
                Publish
              </LoadingButton>
            </form>
          </Form>
        </section>
      </AnimationWrapper>
    </>
  )
}

export default BlogEditor
