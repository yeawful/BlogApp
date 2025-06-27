import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { deleteArticle } from "../../store/ArticleSlice";
import { useAppDispatch } from "../../store/store";
import { ArticleType } from "../../types/ArticleInterfaces";
import classes from "./index.module.scss";

interface ArticleActionsProps {
    article: ArticleType;
}

const ArticleActions = ({ article }: ArticleActionsProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () => {
        navigate(`/articles/${article.slug}/edit`);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await dispatch(deleteArticle(article.slug)).unwrap();
            navigate("/");
        } catch {
            Modal.error({
                content: "Не удалось удалить статью",
            });
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className={classes.actions}>
                <Button
                    danger
                    onClick={() => setIsModalOpen(true)}
                    loading={isDeleting}
                    className={classes.actionsDeleteBtn}
                >
                    Delete
                </Button>
                <Button
                    type="primary"
                    onClick={handleEdit}
                    loading={isDeleting}
                    className={classes.actionsEditBtn}
                >
                    Edit
                </Button>
            </div>

            <Modal
                title="Confirm deletion"
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isDeleting}
            >
                <p>Вы уверены, что хотите удалить эту статью?</p>
            </Modal>
        </>
    );
};

export default ArticleActions;
