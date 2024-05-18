import { api } from "./api";

export const notificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotificationsByUserId: builder.query<any, void>({
            query: () => ({
                url: `/notifications`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useGetNotificationsByUserIdQuery,
    useLazyGetNotificationsByUserIdQuery} = notificationsApi