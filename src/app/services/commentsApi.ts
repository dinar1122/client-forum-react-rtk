import { Comment } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<Comment, Partial<Comment>>({
            query: (commentData) => ({
                url: '/comments',
                method: 'POST',
                body: commentData
            })
        }),
        deleteComment: builder.mutation<void, string>({
            query: (commentId) => ({
                url: '/comments',
                method: 'DELETE',
                body: commentId

            })
        }),
    })
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation
} = commentApi

export const { endpoints: {createComment, deleteComment}} = commentApi