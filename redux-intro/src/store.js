import { createStore, combineReducers } from "redux";
import { customerReducer } from "./Features/Customers/CustomerSlice";
import { accountReducer } from "./Features/Accounts/AccountSlice";
import {
  deposit,
  withdraw,
  payloan,
  requestloan,
} from "./Features/Accounts/AccountSlice";

import {
  createCustomer,
  updateFullName,
} from "./Features/Customers/CustomerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
