import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            { token: string },
            { email: string, password: string }
        >({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),
        register: builder.mutation<
            { email: string, password: string, username: string },
            { email: string, password: string, username: string }
        >({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        current: builder.query<User, void>({
            query: () => ({
                url: '/current',
                method: 'GET'
            })
        }),
        getUserById: builder.query<any, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<User, { userData: any, id: string }>({
            query: ({ userData, id }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: userData
            })
        }),
    })
})

export const { 
    useRegisterMutation,
    useCurrentQuery, 
    useLazyCurrentQuery, 
    useUpdateUserMutation, 
    useGetUserByIdQuery, 
    useLazyGetUserByIdQuery, 
    useLoginMutation 
} = userApi

export const {
    endpoints: { login, register, current, getUserById, updateUser },
  } = userApi