import axios from "axios";
import {
    ArticleFilters,
    ArticlesResponse,
    ArticleType,
    ICreateArticle,
} from "../types/ArticleInterfaces";
import { getToken } from "../utils/encryptUtils";

const apiBaseUrl = "https://blog-platform.kata.academy/api";

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

export const fetchArticlesApi = async (
    params: ArticleFilters,
): Promise<ArticlesResponse> => {
    const response = await apiClient.get<ArticlesResponse>("/articles", {
        params,
    });
    return response.data;
};

export const fetchArticle = async (
    slug: string,
): Promise<{ article: ArticleType }> => {
    const response = await apiClient.get<{ article: ArticleType }>(
        `/articles/${slug}`,
    );
    return response.data;
};

export const createArticle = async (
    data: ICreateArticle,
): Promise<{ article: ArticleType }> => {
    const response = await apiClient.post<{ article: ArticleType }>(
        "/articles",
        {
            article: data,
        },
    );
    return response.data;
};

export const updateArticle = async (
    slug: string,
    data: ICreateArticle,
): Promise<{ article: ArticleType }> => {
    const response = await apiClient.put<{ article: ArticleType }>(
        `/articles/${slug}`,
        {
            article: data,
        },
    );
    return response.data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
    await apiClient.delete(`/articles/${slug}`);
};
