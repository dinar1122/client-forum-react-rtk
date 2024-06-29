import { Category } from "../types";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryList: builder.query<Category[], void>({
            query: () => ({
                url: `/category`,
                method: `GET`
            })
        }),
        getCategoryById: builder.query<Category, string>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: `GET`
            })
        }),
        createSubscriptionCategory: builder.mutation<any, any>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: `POST`
            })
        }),
        deleteSubscriptionCategory: builder.mutation<any, any>({
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