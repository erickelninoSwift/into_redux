import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestloan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = state.loan + action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + state.loan;
      },
    },
    payloan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export const { payloan, requestloan, withdraw } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  if (currency !== "USD") {
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      // API call
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await response.json();
      const convertedData = data.rates.USD;
      console.log(convertedData);
      dispatch({ type: "account/deposit", payload: convertedData });

      // return Action
    };
  }
}
export default accountSlice.reducer;

// export const accountReducer = (state = initialStateAccount, action) => {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       return {
//         ...state,
//         loan: action.payload.loan,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.loan,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: action.payload.loanPurpose,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// };

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestloan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { loan: amount, loanPurpose: purpose },
//   };
// }
// export function payloan() {
//   return { type: "account/payLoan", payload: { loan: 0, loanPurpose: "" } };
// }
