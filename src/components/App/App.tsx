import { Route, Routes } from "react-router-dom";
import ArticleList from "../ArticleList";
import ArticlePost from "../ArticlePost";
import CreateArticlePage from "../CreateArticle";
import EditArticlePage from "../EditArticle";
import Header from "../Header";
import Initializer from "../Initializer";
import PrivateRoute from "../PrivateRoute";
import Profile from "../Profile";
import Sign from "../Sign";

const App = () => {
    return (
        <Initializer>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<ArticleList />} />
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:slug" element={<ArticlePost />} />
                    <Route
                        path="/articles/:slug/edit"
                        element={
                            <PrivateRoute>
                                <EditArticlePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/new-article"
                        element={
                            <PrivateRoute>
                                <CreateArticlePage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/sign-in" element={<Sign mode="login" />} />
                    <Route path="/sign-up" element={<Sign mode="register" />} />
                </Route>
            </Routes>
        </Initializer>
    );
};

export default App;
