import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducers";

const Store = configureStore({
  reducer: {
    cart: customReducer,
  },
});

export default Store;
