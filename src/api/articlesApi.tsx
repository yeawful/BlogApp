import axios from 'axios';
import { ArticleType, ArticleFilters, ArticlesResponse } from '../types/ArticleInterfaces';

const apiBaseUrl = 'https://blog-platform.kata.academy/api';

const apiClient = axios.create({
    baseURL: apiBaseUrl,
});

export const fetchArticlesApi = async (params: ArticleFilters): Promise<ArticlesResponse> => {
    const response = await apiClient.get<ArticlesResponse>('/articles', { params });
    return response.data;
};

export const fetchArticle = async (slug: string): Promise<{ article: ArticleType }> => {
    const response = await apiClient.get<{ article: ArticleType }>(`/articles/${slug}`);
    return response.data;
};
