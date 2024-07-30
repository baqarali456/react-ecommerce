import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryname: "",
  categories: [],
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategoryName: (state, action) => {
      state.categoryname = action.payload;
    },
    addCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { changeCategoryName, addCategories } = CategorySlice.actions;

const CategoryReducer = CategorySlice.reducer;
export { CategoryReducer };
