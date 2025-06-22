import { Link, Outlet, useNavigate } from 'react-router-dom';
import classes from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/UserSlice';
import Avatar from '../../assets/icons/avatar.svg';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <header className={classes.header}>
                <Link to="/">
                    <span className={classes.headerTitle}>Realworld Blog</span>
                </Link>
                <div className={classes.headerButton}>
                    {user ? (
                        <>
                            <Link to="/profile">
                                <button className={classes.headerProfileBtn}>
                                    {user.username}
                                    <img
                                        src={user.image || Avatar}
                                        alt="Avatar"
                                        className={classes.avatar}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = Avatar;
                                        }}
                                    />
                                </button>
                            </Link>
                            <button className={classes.headerLogoutBtn} onClick={handleLogout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in">
                                <button className={classes.headerSignInBtn}>Sign in</button>
                            </Link>
                            <Link to="/sign-up">
                                <button className={classes.headerSignUpBtn}>Sign up</button>
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
