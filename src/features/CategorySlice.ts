import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { categoryApi } from '../app/services/categoryApi';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryState {
  categories: any;
}

const initialCategoryState: any = {
  categories: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(categoryApi.endpoints.getCategoryList.matchFulfilled, (state, action) => {
        state.categories = action.payload
      })
  }
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;

export const selectCategories = (state: RootState) => state.categorySlice.categories;