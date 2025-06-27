import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchCurrentUser } from "../store/UserSlice";
import { getToken } from "../utils/encryptUtils";

const Initializer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(fetchCurrentUser(token));
        }
    }, [dispatch]);

    return <>{children}</>;
};

export default Initializer;
