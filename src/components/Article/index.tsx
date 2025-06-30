import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { favoriteArticle, unfavoriteArticle } from "../../store/ArticleSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ArticleType } from "../../types/ArticleInterfaces";
import { formatDate } from "../../utils/dateutils";
import ArticleActions from "../ArticleActions";
import classes from "./index.module.scss";

interface BlogProps {
    article: ArticleType;
    isFullView?: boolean;
}

const Article = ({ article, isFullView = false }: BlogProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const isAuthor = user?.username === article.author.username;
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    const handleFavoriteClick = async () => {
        if (!user) return;

        try {
            setIsFavoriteLoading(true);
            if (article.favorited) {
                await dispatch(unfavoriteArticle(article.slug)).unwrap();
            } else {
                await dispatch(favoriteArticle(article.slug)).unwrap();
            }
        } catch {
            console.error("Ошибка");
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    return (
        <div className={classes.article}>
            <div className={classes.articleTop}>
                <div className={classes.articleLeftSide}>
                    <div className={classes.articleTitleLikes}>
                        <Link to={`/articles/${article.slug}`}>
                            <h1 className={classes.articleTitle}>
                                {article.title}
                            </h1>
                        </Link>
                        <label className={classes.articleLabel}>
                            <input
                                className={classes.articleCheckbox}
                                type="checkbox"
                                id="heart"
                                checked={article.favorited}
                                onChange={handleFavoriteClick}
                                disabled={!user || isFavoriteLoading}
                            />
                            <span className={classes.articleCountCheck}>
                                {article.favoritesCount}
                            </span>
                        </label>
                    </div>

                    <div className={classes.articleGenres}>
                        {article.tagList.map((tag) => (
                            <span
                                key={tag}
                                className={classes.articleGenresTags}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={classes.articleRightSide}>
                    <div className={classes.articleAutorDate}>
                        <p className={classes.articleAutor}>
                            {article.author.username}
                        </p>
                        <div className={classes.articleDate}>
                            {formatDate(article.createdAt)}
                        </div>
                    </div>
                    <img
                        className={classes.articleImg}
                        alt="Avatar"
                        src={article.author.image || "/avatar.svg"}
                        width="46"
                        height="46"
                    />
                </div>
            </div>
            <div className={classes.articleDescription}>
                <div className={classes.articleDescriptionWrap}>
                    {article.description}

                    {isFullView && isAuthor && (
                        <ArticleActions article={article} />
                    )}
                </div>
            </div>

            {isFullView && (
                <div className={classes.articleBody}>
                    <Markdown>{article.body}</Markdown>
                </div>
            )}
        </div>
    );
};

export default Article;
