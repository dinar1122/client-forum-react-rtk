import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store"
import { PayloadAction } from '@reduxjs/toolkit';

interface GeneralState {
    topicList: any;
  }
  
  const initialGeneralState: GeneralState = {
    topicList: null,
  };
  
  const generalSlice = createSlice({
    name: 'general',
    initialState: initialGeneralState,
    reducers: {
      setData: (state, action: PayloadAction<any>) => {
        state.topicList = action.payload;
      },
      clearData: (state) => {
        state.topicList = null;
      },
    },
  });
  
  export const { setData, clearData } = generalSlice.actions;
  export default generalSlice.reducer;
  
  export const selectGeneralData = (state: RootState) => state.GeneralSlice;