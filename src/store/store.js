import { configureStore } from "@reduxjs/toolkit";
import { RegisterReducer } from "./signSlice";
import { CategoryReducer } from "./categorySlice";
import { ProductReducer } from "./productSlice";


export const store = configureStore({
   reducer:{
      RegisterReducer,
      CategoryReducer,
      ProductReducer,
   },
})