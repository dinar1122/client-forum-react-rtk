import { Post, PostMetaData } from "../types";
import { api } from "./api";


export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, { content: string, topicId: string, categoryId: string, postTags: object }>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData
            })
        }),
        updatePostById: builder.mutation<Post, {postId: string, content: string, topicId: string, categoryId: string, postTags: object }>({
            query: (postData) => ({
                url: `/posts/${postData.postId}`,
                method: 'PUT',
                body: postData
            })
        }),
        getAllPosts: builder.query<PostMetaData, { page: number }>({
            query: ({ page }) => ({
              url: `/posts`,
              method: 'GET',
              params: { page },
            }),
          }),
        getPostById: builder.query<Post, string>({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'GET',

            })
        }),
        deletePostById: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',

            })
        }),
    })
})

export const {
    useCreatePostMutation,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery
} = postApi

export const { endpoints: { createPost, getAllPosts, getPostById, deletePostById, updatePostById } } = postApi