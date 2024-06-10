import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  name: string;
  description: string;
  // Добавьте другие поля, если необходимо
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
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;

export const selectCategories = (state: RootState) => state.categorySlice.categories;