import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    RegisterRequest,
    UserState,
    LoginRequest,
    UpdateUserRequest,
} from '../types/UserInterfaces';
import { registerUserApi, loginUserApi, getCurrentUserApi, updateUserApi } from '../api/userApi';

const initialState: UserState = {
    user: null,
    isLoading: 'i',
    error: null,
    isInitializing: true,
};

interface ApiErrorResponse {
    errors: {
        [key: string]: string[];
    };
}

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
            const errors = error.response.data as ApiErrorResponse;
            if (errors?.errors) {
                const messages = [];
                for (const [field, fieldErrors] of Object.entries(errors.errors)) {
                    messages.push(`${field}: ${fieldErrors.join(', ')}`);
                }
                return messages.join('; ');
            }
            return 'Проверьте правильность введенных данных';
        }
        if (error.response?.status === 401) {
            return 'Неверный email или пароль';
        }
        if (error.response?.status === 403) {
            return 'Доступ запрещен';
        }
        if (error.response?.status === 404) {
            return 'Пользователь не найден';
        }
        return error.response?.data?.message || 'Произошла ошибка при выполнении запроса';
    }
    return 'Произошла неизвестная ошибка';
};

export const loginUser = createAsyncThunk<UserState['user'], LoginRequest>(
    'user/login',
    async (data) => {
        try {
            const response = await loginUserApi(data);
            localStorage.setItem('token', response.user.token);
            return response.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

export const registerUser = createAsyncThunk<UserState['user'], RegisterRequest>(
    'user/register',
    async (data) => {
        try {
            const res = await registerUserApi(data);
            localStorage.setItem('token', res.user.token);
            return res.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

export const fetchCurrentUser = createAsyncThunk<UserState['user']>(
    'user/fetchCurrentUser',
    async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            const response = await getCurrentUserApi(token);
            return response.user;
        } catch (error) {
            localStorage.removeItem('token');
            throw handleApiError(error);
        }
    },
);

export const updateUserProfile = createAsyncThunk<UserState['user'], UpdateUserRequest>(
    'user/update',
    async (data) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const payload: UpdateUserRequest = {};
            if (data.username !== undefined) payload.username = data.username;
            if (data.email !== undefined) payload.email = data.email;
            if (data.password !== undefined) payload.password = data.password;
            if (data.image !== undefined) payload.image = data.image || null;

            const response = await updateUserApi(payload, token);
            return response.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = 'i';
            state.error = null;
            state.isInitializing = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.error.message || 'Ошибка авторизации';
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.error.message || 'Ошибка регистрации';
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = 'loading';
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.user = action.payload;
                state.error = null;
                state.isInitializing = false;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.error.message || 'Ошибка загрузки пользователя';
                state.isInitializing = false;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = 'loading';
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.error.message || 'Ошибка обновления профиля';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
