import axios from 'axios';
import { ArticleType, ArticleFilters, ArticlesResponse } from '../types/ArticleInterfaces';
import { getToken } from '../utils/encryptUtils';

const apiBaseUrl = 'https://blog-platform.kata.academy/api';

export const apiClient = axios.create({
    baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const fetchArticlesApi = async (params: ArticleFilters): Promise<ArticlesResponse> => {
    const response = await apiClient.get<ArticlesResponse>('/articles', { params });
    return response.data;
};

export const fetchArticle = async (slug: string): Promise<{ article: ArticleType }> => {
    const response = await apiClient.get<{ article: ArticleType }>(`/articles/${slug}`);
    return response.data;
};
