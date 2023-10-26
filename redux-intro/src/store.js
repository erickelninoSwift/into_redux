import { createStore, combineReducers } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountReducer = (state = initialStateAccount, action) => {
  if (action.type === "account/deposit") {
    return { ...state, balance: state.balance + action.payload };
  }

  if (action.type === "account/withdraw") {
    return { ...state, balance: state.balance - action.payload };
  }

  if (action.type === "account/requestLoan") {
    return {
      ...state,
      loan: action.payload.loan,
      loanPurpose: action.payload.loanPurpose,
      balance: state.balance + action.payload.loan,
    };
  }
  if (action.type === "account/payLoan") {
    return {
      ...state,
      balance: state.balance - state.loan,
      loan: 0,
      loanPurpose: action.payload.loanPurpose,
    };
  }
  if (action.type === "") {
    return state;
  }
};
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log("hey jackpot");

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { loan: 200, loanPurpose: "school" },
// });

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestloan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, loanPurpose: purpose },
  };
}
function payloan() {
  return { type: "account/payLoan", payload: { loan: 0, loanPurpose: "" } };
}

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestloan(1000, "buy school clothes"));
// store.dispatch(payloan());

const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state = initialStateCustomer, action) => {
  if (action.type === "account/createcustomer") {
    return {
      ...state,
      fullname: action.payload.fullname,
      nationalID: action.payload.nationalID,
      createdAt: action.payload.createdAt,
    };
  }
  if (action.type === "account/updateName") {
    return { ...state, fullname: action.payload };
  }
  if (action.type === "") {
    return state;
  }
};

const createCustomer = (fullname, nationalID) => {
  return {
    type: "account/createCustomer",
    payload: {
      fullname,
      nationalID,
      createdAt: new Date().toDateString(),
    },
  };
};

const rootReducer = combineReducers({
  a: accountReducer,
  b: customerReducer,
});

const store = createStore(rootReducer);

console.log(store);

const updateFullName = (fullname) => {
  return { type: "account/update", payload: fullname };
};
