import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../api/auth";

const login = createAsyncThunk(
    'auth/login',
    async ({email, password}) => {
        const { user } = await authAPI.login(email, password);
        return {
            uid: user.uid,
            email: user.email,
        };
    }
);

export { login }
