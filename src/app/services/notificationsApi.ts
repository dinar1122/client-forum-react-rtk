import { api } from "./api";

export const notificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotificationsByUserId: builder.query<any, void>({
            query: () => ({
                url: `/notifications`,
                method: 'GET',
            })
        }),
        ReadNotifications: builder.mutation<any, any>({
            query: (req) => ({
                url: `/notifications`,
                method: 'POST',
                body: req
            })
        }),
    })
})

export const {
    useGetNotificationsByUserIdQuery,
    useLazyGetNotificationsByUserIdQuery,
    useReadNotificationsMutation
} = notificationsApi