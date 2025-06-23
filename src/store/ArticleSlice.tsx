import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchArticle as fetchArticleApi, fetchArticlesApi } from "../api/articlesApi";
import { ArticleType, ArticlesResponse, ArticlesState } from "../types/ArticleInterfaces";

interface FetchArticlesParams {
    limit: number;
    offset: number;
}

const initialState: ArticlesState = {
    articles: [],
    currentArticle: null,
    isLoading: true,
    error: null,
    currentPage: 1,
    totalArticles: 0,
};

export const fetchArticles = createAsyncThunk<ArticlesResponse, FetchArticlesParams>(
    "articles/fetchArticles",
    async ({ limit, offset }) => {
        return await fetchArticlesApi({ limit, offset });
    },
);

export const fetchArticle = createAsyncThunk<ArticleType, string>(
    "articles/fetchArticle",
    async (slug) => {
        const response = await fetchArticleApi(slug);
        return response.article;
    },
);

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload.articles;
                state.totalArticles = action.payload.articlesCount;
                state.error = null;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Не удалось получить статьи";
                state.articles = [];
                state.totalArticles = 0;
            })
            .addCase(fetchArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentArticle = action.payload;
            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Не удалось получить статью";
            });
    },
});

export default articlesSlice.reducer;
export const { setCurrentPage } = articlesSlice.actions;
