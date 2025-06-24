import { useEffect } from "react";

import { fetchCurrentUser } from "../store/UserSlice";
import { useAppDispatch } from "../store/store";
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
