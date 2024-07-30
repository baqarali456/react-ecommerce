import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerUsername: "",
  loginUsername: "",
  email: "",
  registerPassword: "",
  loginPassword: "",
  phoneNumber: "",
  role: "user",
  registerErrorMessage: "",
  loginErrorMessage: "",
  registerError: false,
  loginError: false,
  loggedin: {
    username: "",
    success: false,
    role: "user",
  },
};

export const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    changeregisterUsername: (state, action) => {
      state.registerUsername = action.payload;
    },
    changeloginUsername: (state, action) => {
      state.loginUsername = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changeregisterPassword: (state, action) => {
      state.registerPassword = action.payload;
    },
    changeloginPassword: (state, action) => {
      state.loginPassword = action.payload;
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    changePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    changeregisterErrorMessage: (state, action) => {
      state.registerErrorMessage = action.payload;
    },
    changeloginErrorMessage: (state, action) => {
      state.loginErrorMessage = action.payload;
    },
    changeloginError: (state, action) => {
      state.loginError = action.payload;
    },
    isLogin: (state, action) => {
      const { name, role } = action.payload;
      state.loggedin = {
        ...state.loggedin,
        username: name,
        role,
        success: true,
      };
    },
  },
});

export const {
  changeloginError,
  changeloginErrorMessage,
  isLogin,
  changeregisterError,
  changeregisterErrorMessage,
  changeEmail,
  changeloginPassword,
  changePhoneNumber,
  changeregisterUsername,
  changeRole,
  changeregisterPassword,
  changeloginUsername,
} = signSlice.actions;

const RegisterReducer = signSlice.reducer;
export { RegisterReducer };
