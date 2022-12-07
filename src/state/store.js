import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "../components/services/api-services";

export const store = configureStore({
  reducer: { //add the Redux slice reducer to the store
    [apiService.reducerPath]: apiService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware) //add the middleware to the store
});
