import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";

const combinedReducers = combineReducers({
  products: productsReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
