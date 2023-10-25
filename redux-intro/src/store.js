import { createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const reducer = (state = initialState, action) => {
  if (action.type === "account/deposit") {
    return { ...state, balance: state.balance + action.payload };
  }

  if (action.type === "account/withdraw") {
    return { ...state, balance: state.balance - action.payload };
  }

  if (action.type === "account/requestLoan") {
    return { ...state, loan: action.loan };
  }
  if (action.type === "account/payLoan") {
    return { ...state, balance: state.balance - state.loan, loan: 0 };
  }
  if (action.type === "") {
    return state;
  }
};

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });
console.log("hey jackpot");
