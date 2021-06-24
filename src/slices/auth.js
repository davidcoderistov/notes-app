import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/auth";

export const initialState = {
    currentUser: {},
    isAuthenticated: false,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: state => {
            state.loading = true;
        },

        [login.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        [login.rejected]: (state, { error }) => {
            state.error = error;
            state.isAuthenticated = false;
            state.loading = false;
        },
    }
});

export default authSlice.reducer;
