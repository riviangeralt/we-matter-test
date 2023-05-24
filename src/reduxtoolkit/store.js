import { configureStore } from "@reduxjs/toolkit";
import { productsReducers } from "./reducers/products/productsReducers";
import { usersReducers } from "./reducers/users/usersReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ...productsReducers,
  ...usersReducers,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
