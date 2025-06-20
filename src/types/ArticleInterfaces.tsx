export interface Author {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
}

export interface ArticleType {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    id: string;
    author: Author;
}

export interface ArticlesState {
    articles: ArticleType[];
    currentArticle: ArticleType | null;
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    totalArticles: number;
}

export interface ArticlesResponse {
    articles: ArticleType[];
    articlesCount: number;
}

export interface ArticleFilters {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
}
