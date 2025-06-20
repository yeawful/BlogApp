import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination, Alert, Spin } from 'antd';
import classes from './index.module.scss';
import Article from '../Article';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchArticles, setCurrentPage } from '../../store/ArticleSlice';
import { ArticleType } from '../../types/ArticleInterfaces';

const ArticleList = () => {
    const dispatch = useAppDispatch();
    const { articles, isLoading, error, totalArticles, currentPage } = useAppSelector(
        (state) => state.articles,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = Number(searchParams.get('page')) || 1;

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
        return (
            <div className={classes.articleListLoader}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                description="Что-то пошло не так"
                type="error"
                className={classes.articleListError}
            />
        );
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
