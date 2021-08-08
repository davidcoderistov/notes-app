import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../api/auth";

const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, { rejectWithValue }) => {
        try {
            const { user } = await authAPI.login(email, password);
            return {
                uid: user.uid,
                email: user.email,
            };
        } catch(error) {
            const { code, message } = error;
            return rejectWithValue({ error: { code, message } });
        }
    }
);

export { login }
