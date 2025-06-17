import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router';
import { fetchArticle } from '../../store/ArticleSlice';
import { Alert, Spin } from 'antd';
import classes from './index.module.scss';
import Article from '../Article';

const ArticlePost = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { currentArticle, isLoading, error } = useAppSelector((state) => state.articles);

    useEffect(() => {
        if (slug) {
            dispatch(fetchArticle(slug));
        }
    }, [dispatch, slug]);

    if (isLoading === true) {
        return (
            <div className={classes['articlePost__loader']}>
                <Spin size="large" />
            </div>
        );
    }

    if (error || !currentArticle) {
        return (
            <Alert
                description="Что-то пошло не так"
                type="error"
                className={classes['articlePost__error']}
            />
        );
    }

    return <Article article={currentArticle} isFullView />;
};

export default ArticlePost;
