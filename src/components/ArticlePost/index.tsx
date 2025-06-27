import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../store/ArticleSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Article from "../Article";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";

const ArticlePost = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { currentArticle, isLoading, error } = useAppSelector(
        (state) => state.articles,
    );

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

    return (
        <div>
            <Article article={currentArticle} isFullView />
        </div>
    );
};

export default ArticlePost;
