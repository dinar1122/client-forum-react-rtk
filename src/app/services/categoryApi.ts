import { api } from "./api";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryList: builder.query<any, void>({
            query: () => ({
                url: `/category`,
                method: `GET`
            })
        }),
        getCategoryById: builder.query<any, string>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: `GET`
            })
        }),
        createSubscriptionCategory: builder.mutation<void, any>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: `POST`
            })
        }),
        deleteSubscriptionCategory: builder.mutation<void, any>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: `DELETE`
            })
        }),
    })
})

export const { 
    useGetCategoryListQuery, 
    useLazyGetCategoryListQuery, 
    useCreateSubscriptionCategoryMutation,
    useDeleteSubscriptionCategoryMutation,
    useGetCategoryByIdQuery,
    useLazyGetCategoryByIdQuery
} = categoryApi
export const { endpoints: { getCategoryList, createSubscriptionCategory } } = categoryApi