import { api } from "./api";

export const tagsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTags: builder.query<any, void>({
            query: () => ({
                url: `/tags`,
                method: `GET`
            })
        }),
        createTag: builder.mutation<any, string>({
            query: (nameTag) => ({
                url: `/tags/${nameTag}`,
                method: `POST`
            })
        }),
        createSub: builder.mutation<any, string>({
            query: (tagId) => ({
                url: `/tags/sub/${tagId}`,
                method: `POST`
            })
        }),
        deleteSub: builder.mutation<any, string>({
            query: (tagId) => ({
                url: `/tags/sub/${tagId}`,
                method: `DELETE`
            })
        }),
    })
})

export const { 
    useLazyGetAllTagsQuery,
    useCreateTagMutation,
    useGetAllTagsQuery,
    useCreateSubMutation,
    useDeleteSubMutation
} = tagsApi
export const { endpoints: { getAllTags, createSub, deleteSub, createTag } } = tagsApi