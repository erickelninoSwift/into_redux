import { createStore, combineReducers, applyMiddleware } from "redux";
import { customerReducer } from "./Features/Customers/CustomerSlice";
import { accountReducer } from "./Features/Accounts/AccountSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
