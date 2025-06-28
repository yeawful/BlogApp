import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { createArticleApi } from "../../api/articlesApi";
import { useAppSelector } from "../../store/store";
import { ICreateArticle } from "../../types/ArticleInterfaces";
import ArticleForm from "../ArticleForm";

const CreateArticle = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAppSelector((state) => state.user);

    const initialValues: ICreateArticle = {
        title: "",
        description: "",
        body: "",
        tagList: [],
    };

    const handleSubmit = async (data: ICreateArticle) => {
        if (!user) return;

        try {
            setIsLoading(true);
            const response = await createArticleApi(data);
            Modal.success({
                content: "Статья успешно создана",
            });
            navigate(`/articles/${response.article.slug}`);
        } catch {
            Modal.error({
                content: "Ошибка создания статьи",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ArticleForm
            initialData={initialValues}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mode="create"
        />
    );
};

export default CreateArticle;
