import { createSelector, createSlice } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"
import { RootState } from "../app/store"
import { User } from "../app/types"
import { tagsApi } from "../app/services/tagsApi"
import { categoryApi } from "../app/services/categoryApi"
import { topicApi } from "../app/services/topicApi"


type InitialState = {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })
      .addMatcher(tagsApi.endpoints.createSub.matchFulfilled, (state, action) => {
        if(state.current !== null)
        state.current.userTags = [ ...state.current.userTags,{ ...action.payload}]
      })
      .addMatcher(categoryApi.endpoints.createSubscriptionCategory.matchFulfilled, (state, action) => {
        if(state.current !== null)
        state.current.category = [ ...state.current.category , action.payload]
      })
      .addMatcher(categoryApi.endpoints.deleteSubscriptionCategory.matchFulfilled, (state, action: any) => {
        if(state.current !== null)
        state.current.category = state.current.category.filter(category => category.categoryId !== action.payload.categoryId);
      })
      .addMatcher(topicApi.endpoints.createSubcription.matchFulfilled, (state, action) => {
        if(state.current !== null)
        state.current.topics = [ ...state.current.topics , action.payload]
      })
      .addMatcher(topicApi.endpoints.deleteSubcription.matchFulfilled, (state, action: any) => {
        if(state.current !== null)
        state.current.topics = state.current.topics.filter(topic => topic.topicId !== action.payload.topicId);
      })
      .addMatcher(tagsApi.endpoints.deleteSub.matchFulfilled, (state, action) => {
        if (state.current !== null) {
          state.current.userTags = state.current.userTags.filter(tag => tag.id !== action.payload.id);
        }
      })
      .addMatcher(userApi.endpoints.getUserById.matchFulfilled,(state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated

export const selectCurrent = (state: RootState) => state.user.current

export const selectCurrentTagsSubs = (state: RootState) => state.user.current?.userTags

export const selectCurrentSubscribedTopicsNCategories = createSelector(
  (state: RootState) => state.user.current,
  (current) => ({
    category: current?.category,
    topic: current?.topics,
  })
);

export const selectUsers = (state: RootState) => state.user.users

export const selectUser = (state: RootState) => state.user.user
