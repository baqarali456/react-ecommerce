import { configureStore } from "@reduxjs/toolkit";
import { RegisterReducer } from "./signSlice";


export const store = configureStore({
   reducer:RegisterReducer,
})