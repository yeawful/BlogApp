import { useEffect } from "react";

import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";

import { fetchArticles, setCurrentPage } from "../../store/ArticleSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ArticleType } from "../../types/ArticleInterfaces";
import Article from "../Article";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";
import classes from "./index.module.scss";

const ArticleList = () => {
    const dispatch = useAppDispatch();
    const { articles, isLoading, error, totalArticles, currentPage } = useAppSelector(
        (state) => state.articles,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        if (pageFromURL !== currentPage) {
            dispatch(setCurrentPage(pageFromURL));
        }
    }, [pageFromURL, dispatch]);

    useEffect(() => {
        dispatch(
            fetchArticles({
                limit: 5,
                offset: (currentPage - 1) * 5,
            }),
        );
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorAlert />;
    }

    return (
        <div className={classes.articleList}>
            <>
                {articles.map((article: ArticleType) => (
                    <Article key={article.slug} article={article} />
                ))}

                <Pagination
                    className={classes.articleListPagination}
                    current={currentPage}
                    total={totalArticles}
                    pageSize={5}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </>
        </div>
    );
};

export default ArticleList;
