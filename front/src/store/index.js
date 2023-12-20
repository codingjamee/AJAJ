import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import locationReducer from "./location";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    location: locationReducer,
  },
});

export default store;
