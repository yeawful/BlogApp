import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { fetchCurrentUser } from '../store/UserSlice';

const Initializer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch]);

    return <>{children}</>;
};

export default Initializer;
