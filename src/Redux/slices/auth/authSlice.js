import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, login, newPassword, register, verifyOTP } from "./authAPI";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  token: null,
  authRequest: false,
  email: null,
  userId:null
};

export const loginAsync = createAsyncThunk("auth/login", async (data) => {
  const response = await login(data);
  return response;
});

export const registerAsync = createAsyncThunk("auth/register", async (data) => {
  const response = await register(data);
  return response;
});

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgot-password",
  async (data) => {
    const response = await forgotPassword(data);
    return response;
  }
);

export const newPasswordAsync = createAsyncThunk(
  "auth/new-password",
  async ({ data, token }) => {
    const response = await newPassword({ data, token });
    return response;
  }
);

export const verifyOTPAsync = createAsyncThunk(
  "auth/verify",
  async (data) => {
    const response = await verifyOTP(data);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userId = null
      toast.success("Log out successfully");
    },
    authRequestToggle: (state, action) => {
      state.authRequest = !state.authRequest;
    },
    authRequestClose: (state, action) => {
      state.authRequest = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.authRequest = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        toast.success(action.payload.message);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        toast.error(action.error.message);
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        // state.isLoggedIn = true;
        state.authRequest = false;
        state.email = action.payload.email;
        toast.success(action.payload.message);
        window.location.href = '/auth/verify'
      })
      .addCase(registerAsync.rejected, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        toast.error(action.error.message);
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        toast.error(action.error.message);
      })
      .addCase(newPasswordAsync.fulfilled, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        // console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(newPasswordAsync.rejected, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        toast.error(action.error.message);
      })
      .addCase(verifyOTPAsync.fulfilled, (state, action) => {
        state.authRequest = false;
        state.isLoggedIn = true
        state.email = null
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        // console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        // state.isLoggedIn = true
        state.authRequest = false;
        toast.error(action.error.message);
      })
  },
});

export const { logout, authRequestToggle, authRequestClose } =
  authSlice.actions;

export default authSlice.reducer;
