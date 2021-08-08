import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/auth";

export const initialState = {
    currentUser: {},
    isAuthenticated: false,
    signInError: {
        email: {},
        password: {}
    },
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSignInEmailError: state => {
            state.signInError.email = {};
        },
        resetSignInPasswordError: state => {
            state.signInError.password = {};
        }
    },
    extraReducers: {
        [login.pending]: state => {
            state.loading = true;
            state.signInError = {
                email: {},
                password: {},
            };
        },

        [login.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.signInError = {
                email: {},
                password: {},
            };
        },

        [login.rejected]: (state, { payload }) => {
            const { error } = payload;
            if(error.code) {
                if(error.code === 'auth/invalid-email' || error.code === 'auth/user-disabled' || error.code === 'auth/user-not-found') {
                    state.signInError.email.isError = true;
                    state.signInError.email.message = error.message;
                } else if(error.code === 'auth/wrong-password') {
                    state.signInError.password.isError = true;
                    state.signInError.password.message = error.message;
                }
            }
            state.isAuthenticated = false;
            state.loading = false;
        },
    }
});

export const {
    resetSignInEmailError,
    resetSignInPasswordError
} = authSlice.actions;

export default authSlice.reducer;
