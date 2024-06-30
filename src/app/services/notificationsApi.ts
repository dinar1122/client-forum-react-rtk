import { Notification } from '../types';
import { api } from './api';

export type NotificationData = {
  post?: Notification[];
  topic?: Notification[];
  follows?: Notification[];
  MENTION?: Notification[];
};

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsByUserId: builder.query<NotificationData, void>({
      query: () => ({
        url: `/notifications`,
        method: 'GET',
      }),
    }),
    ReadNotifications: builder.mutation<any, any>({
      query: (req) => ({
        url: `/notifications`,
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const {
  useGetNotificationsByUserIdQuery,
  useLazyGetNotificationsByUserIdQuery,
  useReadNotificationsMutation,
} = notificationsApi;
