import { apiClient } from './articlesApi';
import { User, RegisterRequest, LoginRequest, UpdateUserRequest } from '../types/UserInterfaces';
import Avatar from '../assets/icons/avatar.svg';

interface UserResponse {
    user: User;
}

export const loginUserApi = async (data: LoginRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/users/login', {
        user: {
            email: data.email,
            password: data.password,
        },
    });
    return response.data;
};

export const registerUserApi = async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/users', {
        user: {
            username: data.username,
            email: data.email,
            password: data.password,
            image: data.image || Avatar,
        },
    });
    return response.data;
};

export const getCurrentUserApi = async (token: string): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/user', {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    return response.data;
};

export const updateUserApi = async (
    data: UpdateUserRequest,
    token: string,
): Promise<UserResponse> => {
    const userData: Partial<UpdateUserRequest> = {};

    if (data.username !== undefined) userData.username = data.username;
    if (data.email !== undefined) userData.email = data.email;
    if (data.password !== undefined) userData.password = data.password;
    if (data.image !== undefined) userData.image = data.image;

    const response = await apiClient.put<UserResponse>(
        '/user',
        { user: userData },
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        },
    );
    return response.data;
};
