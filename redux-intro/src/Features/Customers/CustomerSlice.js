import { createStore } from "redux";

const initialStateCustomer = {
  FullName: "",
  nationalID: "",
  createdAt: "",
};

export const customerReducer = (state1 = initialStateCustomer, action) => {
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

export const createCustomer = (name, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: {
      FullName: name,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

export const updateFullName = (name) => {
  return { type: "customer/update", payload: name };
};
