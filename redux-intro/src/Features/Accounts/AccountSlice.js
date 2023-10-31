import { createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loan,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: action.payload.loanPurpose,
      };

    default:
      return state;
  }
};

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestloan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, loanPurpose: purpose },
  };
}
export function payloan() {
  return { type: "account/payLoan", payload: { loan: 0, loanPurpose: "" } };
}
