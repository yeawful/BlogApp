import { Link } from 'react-router';
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
            <div className={classes['article__top']}>
                <div className={classes['article__left-side']}>
                    <div className={classes['article__title-likes']}>
                        <Link to={`/articles/${article.slug}`}>
                            <h1 className={classes['article__title']}>{article.title}</h1>
                        </Link>
                        <label htmlFor="heart" className={classes['article__label']}>
                            <input
                                className={classes['article__checkbox']}
                                type="checkbox"
                                id="heart"
                            />
                            <span className={classes['article__count-chek']}>
                                {article.favoritesCount}
                            </span>
                        </label>
                    </div>

                    <div className={classes['article__genres']}>
                        {article.tagList.map((tag, index) => (
                            <span key={index} className={classes['article__genres_tags']}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={classes['article__right-side']}>
                    <div className={classes['article__autor-date']}>
                        <p className={classes['article__autor']}>{article.author.username}</p>
                        <div className={classes['article__date']}>
                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                    <img
                        className={classes['article__img']}
                        alt="Avatar"
                        src={article.author.image || '/avatar.svg'}
                        width="46"
                        height="46"
                    />
                </div>
            </div>
            <div className={classes['article__description']}>
                {article.description}

                {isFullView && (
                    <div className={classes['article__body']}>
                        <Markdown>{article.body}</Markdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
