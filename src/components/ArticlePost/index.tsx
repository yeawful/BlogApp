import { useEffect } from 'react';
import { useParams } from 'react-router';
import Article from '../Article';
import Loader from '../Loader';
import ErrorAlert from '../ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchArticle } from '../../store/ArticleSlice';

const ArticlePost = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { currentArticle, isLoading, error } = useAppSelector((state) => state.articles);

    useEffect(() => {
        if (slug) {
            dispatch(fetchArticle(slug));
        }
    }, [dispatch, slug]);

    if (isLoading) {
        return <Loader />;
    }

    if (error || !currentArticle) {
        return <ErrorAlert />;
    }

    return <Article article={currentArticle} isFullView />;
};

export default ArticlePost;
