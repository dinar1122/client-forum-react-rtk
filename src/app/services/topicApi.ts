import { api } from "./api";

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSubcription: builder.mutation<void, {followingId: string}>({
            query: (topicId) => ({
                url: `/topic/${topicId}`,
                method: 'POST',
            })
        }),
        deleteSubcription: builder.mutation<void, string>({
            query: (topicId) => ({
                url: `/topic/${topicId}`,
                method: 'DELETE'

            })
        }),
        getTopicList: builder.query<any, void>({
            query: () => ({
                url: `/topic`,
                method: `GET`
            })
        })
    })
})

export const { endpoints: { createSubcription, deleteSubcription, getTopicList} } = topicApi