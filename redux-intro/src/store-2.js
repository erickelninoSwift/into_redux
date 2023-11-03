import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { customerReducer } from "./Features/Customers/CustomerSlice";
import { accountReducer } from "./Features/Accounts/AccountSlice";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
