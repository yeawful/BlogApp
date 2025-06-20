import { Link, Outlet } from 'react-router-dom';
import classes from './index.module.scss';

const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <Link to="/">
                    <span className={classes.headerTitle}>Realworld Blog</span>
                </Link>
                <div className={classes.headerButton}>
                    <Link to="/sign-in">
                        <button className={classes.headerSignInBtn}>Sign in</button>
                    </Link>
                    <Link to="/sign-up">
                        <button className={classes.headerSignUpBtn}>Sign up</button>
                    </Link>
                </div>
            </header>

            <Outlet />
        </>
    );
};

export default Header;
