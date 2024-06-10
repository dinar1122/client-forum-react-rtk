import { api } from "./api";

export const tagsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTags: builder.query<any, void>({
            query: () => ({
                url: `/tags`,
                method: `GET`
            })
        })
    })
})

export const { 
    useLazyGetAllTagsQuery,
    useGetAllTagsQuery
} = tagsApi
export const { endpoints: { getAllTags } } = tagsApi