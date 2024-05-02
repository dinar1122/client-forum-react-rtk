import { Dislike } from "../types";
import { api } from "./api";

export const dislikesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createDislike: builder.mutation<Dislike, string>({
            query: (postId) => ({
                url: `/dislikes/${postId}`,
                method: 'POST',
            })
        }),
        deleteDislike: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/dislikes/${postId}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { useCreateDislikeMutation, useDeleteDislikeMutation } = dislikesApi

export const {endpoints: {createDislike, deleteDislike}} = dislikesApi