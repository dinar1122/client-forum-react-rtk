import { api } from "./api";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        followOnUser: builder.mutation<void, string>({
            query: (followingId) => ({
                url: `/follows/${followingId}`,
                method: 'POST',
            })
        }),
        deleteFollowOnUser: builder.mutation<void, string>({
            query: (followingId) => ({
                url: `/follows/${followingId}`,
                method: 'DELETE'

            })
        }),
    })
})

export const {
    useDeleteFollowOnUserMutation,
    useFollowOnUserMutation
} = followsApi

export const {endpoints: {followOnUser, deleteFollowOnUser}} = followsApi