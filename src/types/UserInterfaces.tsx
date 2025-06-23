export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string | null;
}

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    image?: string;
}

export interface UpdateUserRequest {
    email?: string;
    username?: string;
    password?: string;
    image?: string | null;
}

export interface AuthFormData {
    username?: string;
    email: string;
    password: string;
    repeatPassword?: string;
    acceptTerms?: boolean;
}

export interface AuthFormProps {
    mode: "login" | "register";
}

export interface ProfileFormData {
    username: string;
    email: string;
    password?: string;
    image?: string;
}
