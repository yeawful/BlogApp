import { Routes, Route } from 'react-router';
import Header from '../Header';
import ArticleList from '../ArticleList';
import ArticlePost from '../ArticlePost';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route index element={<ArticleList />} />
                <Route path="/articles" element={<ArticleList />} />
                <Route path="/articles/:slug" element={<ArticlePost />} />
                <Route path="/sign-in" />
                <Route path="/sign-up" />
            </Route>
        </Routes>
    );
};

export default App;
