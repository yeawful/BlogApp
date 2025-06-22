import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import classes from './index.module.scss';
import { ArticleType } from '../../types/ArticleInterfaces';

interface BlogProps {
    article: ArticleType;
    isFullView?: boolean;
}

const Article = ({ article, isFullView = false }: BlogProps) => {
    return (
        <div className={classes.article}>
            <div className={classes.articleTop}>
                <div className={classes.articleLeftSide}>
                    <div className={classes.articleTitleLikes}>
                        <Link to={`/articles/${article.slug}`}>
                            <h1 className={classes.articleTitle}>{article.title}</h1>
                        </Link>
                        <label className={classes.articleLabel}>
                            <input className={classes.articleCheckbox} type="checkbox" id="heart" />
                            <span className={classes.articleCountCheck}>
                                {article.favoritesCount}
                            </span>
                        </label>
                    </div>

                    <div className={classes.articleGenres}>
                        {article.tagList.map((tag, index) => (
                            <span key={index} className={classes.articleGenresTags}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={classes.articleRightSide}>
                    <div className={classes.articleAutorDate}>
                        <p className={classes.articleAutor}>{article.author.username}</p>
                        <div className={classes.articleDate}>
                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                    <img
                        className={classes.articleImg}
                        alt="Avatar"
                        src={article.author.image || '/avatar.svg'}
                        width="46"
                        height="46"
                    />
                </div>
            </div>
            <div className={classes.articleDescription}>
                {article.description}

                {isFullView && (
                    <div className={classes.articleBody}>
                        <Markdown>{article.body}</Markdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
