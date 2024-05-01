import { api } from "./api";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSubcription: builder.mutation<void, {followingId: string}>({
            query: (topicId) => ({
                url: `/topic/${topicId}`,
                method: 'POST',
            })
        }),
        removeSubcription: builder.mutation<void, string>({
            query: (topicId) => ({
                url: `/topic/${topicId}`,
                method: 'DELETE'

            })
        }),
        getTopicList: builder.query<string[], void>({
            query: () => ({
                url: `/topic`,
                method: `GET`
            })
        })
    })
})