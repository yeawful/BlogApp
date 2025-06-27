import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getCurrentUserApi,
    loginUserApi,
    registerUserApi,
    updateUserApi,
} from "../api/userApi";
import {
    LoginRequest,
    RegisterRequest,
    UpdateUserRequest,
    UserState,
} from "../types/UserInterfaces";
import { getToken, removeToken, saveToken } from "../utils/encryptUtils";

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
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
                return Object.entries(errors.errors)
                    .map(
                        ([field, fieldErrors]) =>
                            `${field}: ${fieldErrors.join(", ")}`,
                    )
                    .join("; ");
            }
            return "Проверьте правильность введенных данных";
        }
        return (
            error.response?.data?.message ||
            "Произошла ошибка при выполнении запроса"
        );
    }
    return "Произошла неизвестная ошибка";
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: LoginRequest) => {
        try {
            const response = await loginUserApi(data);
            saveToken(response.user.token);
            return response.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (data: RegisterRequest) => {
        try {
            const res = await registerUserApi(data);
            saveToken(res.user.token);
            return res.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (token: string) => {
        try {
            const response = await getCurrentUserApi(token);
            return response.user;
        } catch (error) {
            removeToken();
            throw handleApiError(error);
        }
    },
);

export const updateUserProfile = createAsyncThunk(
    "user/update",
    async (data: UpdateUserRequest) => {
        try {
            const token = getToken();
            if (!token) throw new Error("No token found");

            const payload = {
                ...(data.username && { username: data.username }),
                ...(data.email && { email: data.email }),
                ...(data.password && { password: data.password }),
                image: data.image || null,
            };

            const response = await updateUserApi(payload, token);
            return response.user;
        } catch (error) {
            throw handleApiError(error);
        }
    },
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка авторизации";
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка регистрации";
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || "Ошибка загрузки пользователя";
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || "Ошибка обновления профиля";
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
