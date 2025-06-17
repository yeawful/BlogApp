import { Link, Outlet } from 'react-router';
import classes from './index.module.scss';

const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <Link to="/">
                    <span className={classes['header__title']}>Realworld Blog</span>
                </Link>
                <div className={classes['header__button']}>
                    <Link to="/sign-in">
                        <button className={classes['header__sign-in-btn']}>Sign in</button>
                    </Link>
                    <Link to="/sign-up">
                        <button className={classes['header__sign-up-btn']}>Sign up</button>
                    </Link>
                </div>
            </header>

            <Outlet />
        </>
    );
};

export default Header;
