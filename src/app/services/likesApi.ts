import { Like } from '../types';
import { api } from './api';

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation<Like, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'POST',
      }),
    }),
    createLikeOnTopic: builder.mutation<Like, string>({
      query: (topicId) => ({
        url: `/likes/topic/${topicId}`,
        method: 'POST',
      }),
    }),
    deleteLike: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useCreateLikeOnTopicMutation,
} = likesApi;

export const {
  endpoints: { createLike, deleteLike, createLikeOnTopic },
} = likesApi;
