import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  productImage: "",
  description: "",
  category: "",
  price: "",
  stock: "",
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeproductName: (state, action) => {
      state.productName = action.payload;
    },
    changeproductImage: (state, action) => {
      state.productImage = action.payload;
    },
    changedescription: (state, action) => {
      state.description = action.payload;
    },
    changecategory: (state, action) => {
      state.category = action.payload;
    },
    changeprice: (state, action) => {
      state.price = action.payload;
    },
    changestock: (state, action) => {
      state.stock = action.payload;
    },
  },
});

export const {
  changecategory,
  changedescription,
  changeprice,
  changeproductImage,
  changeproductName,
  changestock,
} = ProductSlice.actions;

export const ProductReducer = ProductSlice.reducer;
