import { createSlice } from "@reduxjs/toolkit";

interface PagesState {
  isChooseFoodPage: boolean
}

const initialState: PagesState = {
  isChooseFoodPage: false
}

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    togglePages: (state) => {
      state.isChooseFoodPage = !state.isChooseFoodPage
    }
  }
})

export const { togglePages } = pagesSlice.actions

export default pagesSlice.reducer