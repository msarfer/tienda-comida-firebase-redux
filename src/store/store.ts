import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menu/menuSlice'
import pagesReducer from '../features/pages/pagesSlice'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    pages: pagesReducer
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
