import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createArticleApi,
    deleteArticleApi,
    favoriteArticleApi,
    fetchArticleApi,
    fetchArticlesApi,
    unfavoriteArticleApi,
    updateArticleApi,
} from "../api/articlesApi";
import {
    ArticlesResponse,
    ArticlesState,
    ArticleType,
    ICreateArticle,
} from "../types/ArticleInterfaces";

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

export const fetchArticles = createAsyncThunk<
    ArticlesResponse,
    FetchArticlesParams
>("articles/fetchArticles", async ({ limit, offset }) => {
    return await fetchArticlesApi({ limit, offset });
});

export const fetchArticle = createAsyncThunk<ArticleType, string>(
    "articles/fetchArticle",
    async (slug) => {
        const response = await fetchArticleApi(slug);
        return response.article;
    },
);

export const favoriteArticle = createAsyncThunk<ArticleType, string>(
    "articles/favoriteArticle",
    async (slug) => {
        const response = await favoriteArticleApi(slug);
        return response.article;
    },
);

export const unfavoriteArticle = createAsyncThunk<ArticleType, string>(
    "articles/unfavoriteArticle",
    async (slug) => {
        const response = await unfavoriteArticleApi(slug);
        return response.article;
    },
);

export const updateArticle = createAsyncThunk<
    ArticleType,
    { slug: string; articleData: ICreateArticle }
>("articles/updateArticle", async ({ slug, articleData }) => {
    const response = await updateArticleApi(slug, articleData);
    return response.article;
});

export const createArticle = createAsyncThunk<ArticleType, ICreateArticle>(
    "articles/createArticle",
    async (articleData) => {
        const response = await createArticleApi(articleData);
        return response.article;
    },
);

export const deleteArticle = createAsyncThunk<string, string>(
    "articles/deleteArticle",
    async (slug) => {
        await deleteArticleApi(slug);
        return slug;
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
                state.error =
                    action.error.message || "Не удалось получить статьи";
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
                state.error =
                    action.error.message || "Не удалось получить статью";
            })
            .addCase(updateArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentArticle = action.payload;
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || "Не удалось обновить статью";
            })
            .addCase(createArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentArticle = action.payload;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || "Не удалось создать статью";
            })
            .addCase(deleteArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.currentArticle?.slug === action.payload) {
                    state.currentArticle = null;
                }
                state.articles = state.articles.filter(
                    (article) => article.slug !== action.payload,
                );
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || "Не удалось удалить статью";
            })
            .addCase(favoriteArticle.pending, (state, action) => {
                const slug = action.meta.arg;
                state.articles = state.articles.map((article) =>
                    article.slug === slug
                        ? {
                              ...article,
                              favorited: true,
                              favoritesCount: article.favoritesCount + 1,
                          }
                        : article,
                );
                if (state.currentArticle?.slug === slug) {
                    state.currentArticle = {
                        ...state.currentArticle,
                        favorited: true,
                        favoritesCount: state.currentArticle.favoritesCount + 1,
                    };
                }
            })
            .addCase(favoriteArticle.rejected, (state, action) => {
                const slug = action.meta.arg;
                state.articles = state.articles.map((article) =>
                    article.slug === slug
                        ? {
                              ...article,
                              favorited: false,
                              favoritesCount: article.favoritesCount - 1,
                          }
                        : article,
                );
                if (state.currentArticle?.slug === slug) {
                    state.currentArticle = {
                        ...state.currentArticle,
                        favorited: false,
                        favoritesCount: state.currentArticle.favoritesCount - 1,
                    };
                }
            })
            .addCase(unfavoriteArticle.pending, (state, action) => {
                const slug = action.meta.arg;
                state.articles = state.articles.map((article) =>
                    article.slug === slug
                        ? {
                              ...article,
                              favorited: false,
                              favoritesCount: article.favoritesCount - 1,
                          }
                        : article,
                );
                if (state.currentArticle?.slug === slug) {
                    state.currentArticle = {
                        ...state.currentArticle,
                        favorited: false,
                        favoritesCount: state.currentArticle.favoritesCount - 1,
                    };
                }
            })
            .addCase(unfavoriteArticle.rejected, (state, action) => {
                const slug = action.meta.arg;
                state.articles = state.articles.map((article) =>
                    article.slug === slug
                        ? {
                              ...article,
                              favorited: true,
                              favoritesCount: article.favoritesCount + 1,
                          }
                        : article,
                );
                if (state.currentArticle?.slug === slug) {
                    state.currentArticle = {
                        ...state.currentArticle,
                        favorited: true,
                        favoritesCount: state.currentArticle.favoritesCount + 1,
                    };
                }
            });
    },
});

export default articlesSlice.reducer;
export const { setCurrentPage } = articlesSlice.actions;
