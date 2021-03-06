import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../thunks/auth";

export const initialState = {
    currentUser: {},
    isAuthenticated: false,
    signInError: {
        email: {},
        password: {},
        general: {}
    },
    signUpError: {
        email: {},
        password: {},
        general: {}
    },
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSignInErrors: state => {
            state.signInError = {
                email: {},
                password: {},
                general: {}
            };
        },
        resetSignUpErrors: state => {
            state.signUpError = {
                email: {},
                password: {},
                general: {}
            };
        },
    },
    extraReducers: {
        [login.pending]: state => {
            state.loading = true;
            state.signInError = {
                email: {},
                password: {},
                general: {}
            };
        },

        [login.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.signInError = {
                email: {},
                password: {},
                general: {}
            };
        },

        [login.rejected]: (state, { payload }) => {
            const { error } = payload;
            if(error.code) {
                if(error.code === 'auth/invalid-email') {
                    state.signInError.email.isError = true;
                    state.signInError.email.message = error.message;
                } else if(error.code === 'auth/wrong-password') {
                    state.signInError.password.isError = true;
                    state.signInError.password.message = error.message;
                } else {
                    state.signInError.general.isError = true;
                    state.signInError.general.message = error.message;
                }
            }
            state.isAuthenticated = false;
            state.loading = false;
        },

        [signup.pending]: state => {
            state.loading = true;
            state.signUpError = {
                email: {},
                password: {},
                general: {}
            };
        },

        [signup.fulfilled]: state => {
            state.loading = false;
            state.signUpError = {
                email: {},
                password: {},
                general: {}
            };
        },

        [signup.rejected]: (state, { payload }) => {
            const { error } = payload;
            if(error.code) {
                if(error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email') {
                    state.signUpError.email.isError = true;
                    state.signUpError.email.message = error.message;
                } else if(error.code === 'auth/weak-password') {
                    state.signUpError.password.isError = true;
                    state.signUpError.password.message = error.message;
                } else {
                    state.signUpError.general.isError = true;
                    state.signUpError.general.message = error.message;
                }
            }
            state.loading = false;
        },
    }
});

export const {
    resetSignInErrors,
    resetSignUpErrors
} = authSlice.actions;

export default authSlice.reducer;
