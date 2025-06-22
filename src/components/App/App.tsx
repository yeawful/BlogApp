import { Routes, Route } from 'react-router-dom';
import Initializer from '../Initializer';
import Header from '../Header';
import ArticleList from '../ArticleList';
import ArticlePost from '../ArticlePost';
import Sign from '../Sign';
import Profile from '../Profile';

const App = () => {
    return (
        <Initializer>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<ArticleList />} />
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:slug" element={<ArticlePost />} />
                    <Route path="/sign-in" element={<Sign mode="login" />} />
                    <Route path="/sign-up" element={<Sign mode="register" />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Initializer>
    );
};

export default App;
