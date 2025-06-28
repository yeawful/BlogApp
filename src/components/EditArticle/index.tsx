import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { fetchArticle, updateArticle } from "../../store/ArticleSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ICreateArticle } from "../../types/ArticleInterfaces";
import ArticleForm from "../ArticleForm";
import Loader from "../Loader";

const EditArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { currentArticle, isLoading: isArticleLoading } = useAppSelector(
        (state) => state.articles,
    );
    const { user, isLoading: isUserLoading } = useAppSelector(
        (state) => state.user,
    );

    useEffect(() => {
        if (slug && user) {
            dispatch(fetchArticle(slug));
        }
    }, [dispatch, slug, user]);

    const handleSubmit = async (data: ICreateArticle) => {
        if (!slug || !user) return;

        try {
            setIsLoading(true);
            await dispatch(updateArticle({ slug, articleData: data })).unwrap();
            Modal.success({
                content: "Статья успешно обновлена",
            });
            navigate(`/articles/${slug}`);
        } catch {
            Modal.error({
                content: "Ошибка обновления статьи",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isUserLoading || isArticleLoading || !currentArticle) {
        return <Loader />;
    }

    return (
        <ArticleForm
            initialData={currentArticle}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mode="edit"
        />
    );
};

export default EditArticle;
