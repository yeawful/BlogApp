import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ArticleReducer from "./ArticleSlice";
import UserReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        articles: ArticleReducer,
        user: UserReducer,
    },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppStore>();
