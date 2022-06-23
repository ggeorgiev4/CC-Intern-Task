import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/Layout/Layout';
import { NoPage } from '../pages/NoPage/NoPage';
import { Home } from '../pages/Home/Home';
import { Posts } from '../pages/Posts/Posts';
import { Users } from '../pages/Users/Users';

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="*" element={<NoPage />} />
                        <Route index element={<Home />} />
                        <Route path="users" element={<Users />} />
                        <Route path="posts" element={<Posts />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
};
