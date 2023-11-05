import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  FullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullname, nationalid) {
        return {
          payload: {
            fullname,
            nationalid,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.FullName = action.payload.fullname;
        state.nationalID = action.payload.nationalid;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.FullName = action.payload;
    },
  },
});

// export const customerReducer = (state1 = initialStateCustomer, action) => {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state1,
//         FullName: action.payload.FullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateName":
//       return { ...state1, FullName: action.payload };
//     default:
//       return state1;
//   }
// };

// export const createCustomer = (name, nationalID) => {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       FullName: name,
//       nationalID: nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// };

// export const updateFullName = (name) => {
//   return { type: "customer/update", payload: name };
// };

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
