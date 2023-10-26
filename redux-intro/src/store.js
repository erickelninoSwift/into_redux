import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  FullName: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state1 = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state1,
        FullName: action.payload.FullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state1, FullName: action.payload };
    default:
      return state1;
  }
};

const accountReducer = (state = initialStateAccount, action) => {
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

const createCustomer = (name, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: {
      FullName: name,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateFullName = (name) => {
  return { type: "customer/update", payload: name };
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(createCustomer("Erick Elnino", "564485"));
store.dispatch(deposit(200));
console.log(store.getState());
