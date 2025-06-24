import { useEffect } from "react";

import { fetchCurrentUser } from "../store/UserSlice";
import { useAppDispatch } from "../store/store";

const Initializer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return <>{children}</>;
};

export default Initializer;
