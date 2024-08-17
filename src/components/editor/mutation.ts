import { submitPost } from '@/lib/actions/post.action'
import { PostsPage } from '@/types'
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSubmitPostMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async newPost => {
      const queryFilter: QueryFilters = {
        queryKey: ['post-feed', 'home-feed']
      }
      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        oldData => {
          const firstPage = oldData?.pages[0]
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor
                },
                ...oldData.pages.slice(1)
              ]
            }
          }
        }
      )
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data
        }
      })

      toast.success('Blog created')
    },
    onError(error) {
      console.error(error)
      toast.error('Failed to post. please try again.')
    }
  })
  return mutation
}
