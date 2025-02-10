import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menu/menuSlice'
import pagesReducer from '../features/pages/pagesSlice'
import loggerMiddleware from "../middlewares/logger";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    pages: pagesReducer
  },
  middleware: (getDefaultMiddelware) => getDefaultMiddelware().concat(loggerMiddleware)
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
