import { api } from "./api";

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSubcription: builder.mutation<void, any>({
            query: (topicId) => ({
                url: `/topic/${topicId}`,
                method: 'POST',
            })
        }),
        deleteSubcription: builder.mutation<void, any>({
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
        }),
        getTopicListByCategoryId: builder.query<any, string>({
            query: (categoryId) => ({
                url: `/topic/category/${categoryId}`,
                method: `GET`
            })
        })
    })
})

export const { endpoints: { createSubcription, deleteSubcription, getTopicList, getTopicListByCategoryId} } = topicApi