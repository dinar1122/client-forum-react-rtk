import { Post, PostMetaData } from "../types";
import { api } from "./api";

type QueryData = {
    page?: number
    type?: string
    tags?: string[]
    timeframe?: any
    q?:any
  }
export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, { content: string, topicId: string, categoryId: string, postTags?: any[], }>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData
            })
        }),
        updatePostById: builder.mutation<Post, { postId: string, content: string, topicId: string, categoryId: string, postTags: object }>({
            query: (postData) => ({
                url: `/posts/${postData.postId}`,
                method: 'PUT',
                body: postData
            })
        }),
        getAllPosts: builder.query<PostMetaData, QueryData>({
            query: (queryData) => {
                return {
                    url: `/posts`,
                    method: 'GET',
                    params: queryData,
                };
            },
        }),
        getPostsByTopic: builder.query<PostMetaData, any>({
            query: ({id, limit}) => ({
                url: `/posts/topic/${id}`,
                method: 'GET',
                params: {limit}
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
    useLazyGetPostByIdQuery,
    useGetPostsByTopicQuery,
    useLazyGetPostsByTopicQuery
} = postApi

export const { endpoints: { 
    createPost, 
    getAllPosts, 
    getPostById, 
    deletePostById, 
    updatePostById, 
    getPostsByTopic } } = postApi