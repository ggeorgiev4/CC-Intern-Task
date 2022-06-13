import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="app-layout">
                <Header />
                <Outlet />
                {children}
            </div>
        </>
    );
};
